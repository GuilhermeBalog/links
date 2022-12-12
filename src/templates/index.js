const { readdirSync, readFileSync, writeFileSync} = require('fs');
const path = require('path')

const { buildTemplate } = require('../engine')

const indexTemplate = readFileSync(path.join(__dirname, 'index.html'))

const indexProps = readdirSync(__dirname)
  .filter(filename => filename.endsWith('.js') && filename != 'index.js')
  .map(filename => filename.replace('.js', ''))
  .reduce((props, propName) => (
    { ...props, [propName]: require(`./${propName}`)() }
  ), {})

// TODO: minify the final HTML

writeFileSync('index-final.html', buildTemplate(indexTemplate, indexProps))
