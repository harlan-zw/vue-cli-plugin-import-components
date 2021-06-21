import { Component } from '../types'

function injectImports(variable: string, components: Component[]) {
  return `${variable}.components = Object.assign({}, { ${components.map(c => c.pascalName).join(', ')} }, ${variable}.components);`
}

export function injectComponents(source: string, components: Component[]) {
  let newContent
    = `/* vue-cli-plugin-import-components */\n${
      components.map(c => c.import).join('\n')}\n${
      injectImports('script', components)}`

  // script.options is used by vue-property-decorator
  newContent += `if (script.options) { ${injectImports('script.options', components)}}`

  const hotReload = source.indexOf('/* hot reload */')
  if (hotReload > -1)
    source = `${source.slice(0, hotReload) + newContent}\n\n${source.slice(hotReload)}`
  else
    source += `\n\n${newContent}`

  return source
}
