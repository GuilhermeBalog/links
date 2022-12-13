const https = require('https');

function request(url, options) {
  return new Promise((resolve, reject) => {
    const req = https.request(url, options, (response) => {
      let data = '';

      response.on('data', (chunk) => {
        data += chunk;
      });

      response.on('end', () => {
        resolve(JSON.parse(data));
      });

    })

    req.on("error", (err) => {
      reject(err.message);
    });

    if(options.body) {
      req.write(JSON.stringify(options.body))
    }

    req.end()
  })
}

module.exports = { request }
