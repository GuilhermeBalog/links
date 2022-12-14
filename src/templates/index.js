const { readdirSync, readFileSync, writeFileSync, mkdirSync, existsSync } = require('fs');
const path = require('path');

const { minify } = require('html-minifier');
require('dotenv').config()

const { buildTemplate } = require('../lib/buildTemplate');

function minifyHtml(html) {
  return minify(html, {
    collapseBooleanAttributes: true,
    collapseInlineTagWhitespace: true,
    collapseWhitespace: true,
    minifyCSS: true,
    removeComments: true,
    removeRedundantAttributes: true,
    sortAttributes: true,
    sortClassName: true,
  })
}

async function buildIndexFile() {
  const indexTemplate = readFileSync(path.join(__dirname, 'index.html'));

  const builders = readdirSync(__dirname)
    .filter(filename => filename.endsWith('.js') && filename != 'index.js');

  const propsValues = await Promise.all(builders.map(filename => require(`./${filename}`)()));

  const props = {}
  for (let i = 0; i < builders.length; i++) {
    const propName = builders[i].replace('.js', '');

    props[propName] = propsValues[i]
  }

  const builtHtml = buildTemplate(indexTemplate, props);
  const minifiedHtml = minifyHtml(builtHtml);

  return minifiedHtml;
}

async function saveIndexFile() {
  const distFolder = path.join(process.cwd(), 'dist');

  if (!existsSync(distFolder)) {
    mkdirSync(distFolder);
  }

  const indexPath = path.join(distFolder, 'index.html');
  writeFileSync(indexPath, await buildIndexFile());
}

saveIndexFile()
