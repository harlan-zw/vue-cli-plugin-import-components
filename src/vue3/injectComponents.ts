import { Component } from '../types'

function injectImports(variable: string, components: Component[]) {
  return `${variable}.components = Object.assign({}, { ${components.map(c => c.lazy ? c.import : c.pascalName).join(', ')} }, ${variable}.components);`
}

export default function injectComponents(source: string, components: Component[]) {
  const lazyCode = !source.includes('defineAsyncComponent') && components.filter(c => c.lazy).length > 0 ? 'import { defineAsyncComponent } from \'vue\'' : ''

  let newContent
    = `/* vue-cli-plugin-import-components */\n${lazyCode}\n${
      components.filter(c => !c.lazy).map(c => c.import).join('\n')}\n${
      injectImports('script', components)}`

  // script.options is used by vue-property-decorator
  newContent += `if ('__vccOpts' in script) { script.__o = script.__o || {}; ${injectImports('script.__o', components)}}`

  const hotReload = source.indexOf('/* hot reload */')
  if (hotReload > -1)
    source = `${source.slice(0, hotReload) + newContent}\n\n${source.slice(hotReload)}`
  else
    source += `\n\n${newContent}`

  return source
}
