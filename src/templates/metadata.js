const { readFileSync } = require('fs');
const path = require('path')

const { buildTemplate } = require('../lib/buildTemplate');
const { queryGitHub } = require('../lib/github');

const metadataTemplate = readFileSync(path.join(__dirname, 'metadata.html'))

async function getProps() {
  const { repository } = await queryGitHub(`{
    repository(name: "links", owner: "guilhermebalog") {
      openGraphImageUrl
      homepageUrl
    }
  }`);

  const props = {
    title: 'Guilherme Balog | Links',
    description: 'Página listando links para minhas redes sociais e alguns de meus projetos.',
    url: repository.homepageUrl,
    thumbnail: repository.openGraphImageUrl
  };

  return props;
}

module.exports = async () => buildTemplate(metadataTemplate, await getProps())
