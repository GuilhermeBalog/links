function buildTemplate(template, props = {}) {
  const templateParams = Object.keys(props)
  const templateFunctionBody = `"use strict"; return (\`${template}\`);`

  const templateFunction = new Function(...templateParams, templateFunctionBody)

  return templateFunction(...Object.values(props))
}

module.exports = { buildTemplate }
