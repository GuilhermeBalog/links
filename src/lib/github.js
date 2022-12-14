const { request } = require("./request");

async function queryGitHub(query) {
  const response = await request("https://api.github.com/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `bearer ${process.env.GITHUB_TOKEN}`,
      'User-Agent': 'GuilhermeBalog/links',
    },
    body: {
      query
    }
  })

  return response.data;
}

module.exports = { queryGitHub }
