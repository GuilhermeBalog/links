const { readFileSync } = require('fs');
const path = require('path')

const { buildTemplate } = require('../lib/buildTemplate');
const { queryGitHub } = require('../lib/github');

const metadataTemplate = readFileSync(path.join(__dirname, 'profile.html'))

async function getProps() {
  const { user } = await queryGitHub(`{
    user(login: "guilhermebalog") {
      name
      avatarUrl
    }
  }`);

  const props = {
    name: user.name,
    avatarUrl: user.avatarUrl
  };

  return props;
}

module.exports = async () => buildTemplate(metadataTemplate, await getProps())
