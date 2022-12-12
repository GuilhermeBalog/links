const { readFileSync } = require('fs');
const path = require('path')

const cssContent = readFileSync(path.join(__dirname, 'style.css'))

// TODO: minify the CSS

module.exports = () => `<style>${cssContent}</style>`
