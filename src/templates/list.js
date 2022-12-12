const { readFileSync } = require('fs');
const path = require('path')

const { buildTemplate } = require('../engine')

const listItemTemplate = readFileSync(path.join(__dirname, 'list.html'))

const removeAccentsAndTurnToLowerCase = text => text.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase()

const links = [
  { title: "GitHub", href: "https://github.com/guilhermebalog", color: '#24292e', iconClasses: "fab fa-github" },
  { title: "Instagram", href: "https://instagram.com/guilhermebalog", color: '#e1206c', iconClasses: "fab fa-instagram" },
  { title: "LinkedIn", href: "https://linkedin.com/in/guilhermebalog", color: '#0e76a8', iconClasses: "fab fa-linkedin" },
  { title: "Portfólio", href: "https://guilhermebalog.github.io", color: '#673ab7', iconClasses: "fas fa-code" },
].map(link => ({ ...link, id: removeAccentsAndTurnToLowerCase(link.title) }));

module.exports = () => links.map(link => buildTemplate(listItemTemplate, { link })).join('\n')
