const { readFileSync } = require('fs');
const path = require('path')

const { buildTemplate } = require('../engine')

const metadataTemplate = readFileSync(path.join(__dirname, 'metadata.html'))

const title = 'Guilherme Balog | Links'
const description = 'Página listando links para minhas redes sociais e alguns de meus projetos.'
// TODO: fetch URL from GitHub API
const thumbnail = 'https://repository-images.githubusercontent.com/346119820/edfe6f80-9807-11eb-81a3-d573b2409ecf'

module.exports = () => buildTemplate(metadataTemplate, { title, description, thumbnail })
