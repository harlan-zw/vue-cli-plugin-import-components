import {Component} from "../types";

export function injectComponents (source : string, components : Component[]) {

  const newContent =
    `/* vue-cli-plugin-components */\n` +
    components.map(c => c.import).join('\n') + '\n' +
    `script.components = Object.assign({}, { ${components.map(c => c.pascalName).join(', ')} }, script.components);`

  const hotReload = source.indexOf('/* hot reload */')
  if (hotReload > -1) {
    source = source.slice(0, hotReload) + newContent + '\n\n' + source.slice(hotReload)
  } else {
    source += '\n\n' + newContent
  }
  return source
}
