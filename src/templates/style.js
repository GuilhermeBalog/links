const { readFileSync } = require('fs');
const path = require('path')

const cssContent = readFileSync(path.join(__dirname, 'style.css'))

module.exports = async () => `<style>${cssContent}</style>`
