const { readFileSync } = require('fs');
const path = require('path')

const { buildTemplate } = require('../lib/buildTemplate');
const { queryGitHub } = require('../lib/github');
const { removeEmojis } = require('../lib/removeEmojis');

const metadataTemplate = readFileSync(path.join(__dirname, 'metadata.html'))

async function getProps() {
  const { repository } = await queryGitHub(`{
    repository(name: "links", owner: "guilhermebalog") {
      openGraphImageUrl
      homepageUrl
      description
    }
  }`);

  const props = {
    title: 'Guilherme Balog | Links',
    description: removeEmojis(repository.description).trim(),
    url: repository.homepageUrl,
    thumbnail: repository.openGraphImageUrl
  };

  return props;
}

module.exports = async () => buildTemplate(metadataTemplate, await getProps())
