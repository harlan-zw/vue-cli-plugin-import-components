import { loader as webpackLoader } from 'webpack'
import { stringifyRequest } from 'loader-utils'
import type { Component } from '../types'

const installComponents = require.resolve('./runtime/installComponents')

export default function injectComponents(this: webpackLoader.LoaderContext, source: string, components: Component[]) {
  const installComponentRuntime = `const installComponents = require(${stringifyRequest(this, `!${installComponents}`)})`

  const injectScript
    = `/* vue-cli-plugin-import-components */
${installComponentRuntime}
${components.map(c => c.import).join('\n')}
installComponents(component, {${components.map(c => c.pascalName).join(', ')}});`

  const hotReload = source.indexOf('/* hot reload */')
  if (hotReload > -1)
    source = `${source.slice(0, hotReload) + injectScript}\n\n${source.slice(hotReload)}`
  else
    source += `\n\n${injectScript}`

  return source
}
