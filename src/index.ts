import { ServicePlugin, PluginAPI } from '@vue/cli-service'
import { VueCliPluginComponentsOptions, PluginOptions } from './types'
import * as vue3 from './vue3'
import * as vue2 from './vue2'
const { semver, loadModule } = require('@vue/cli-shared-utils')

function loadVue2TemplateCompiler (api : PluginAPI) {
  return loadModule('vue-template-compiler', api.service.context)
    || loadModule('vue-template-compiler', __dirname)
}

const plugin : ServicePlugin = (api: PluginAPI, options: VueCliPluginComponentsOptions) => {

  const resolvedOptions = Object.assign(
    //default configuration
    {
      path: api.resolve('./src/components'),
      extensions: ['vue', 'js', 'ts']
    },
    // users provided configuration
    options.pluginOptions?.components
  ) as PluginOptions

  const vue = loadModule('vue', api.service.context) || loadModule('vue', __dirname)

  if (!vue) {
    return
  }

  const vueVersion = semver.major(vue.version)
  resolvedOptions.vueVersion = vueVersion

  if (vueVersion === 2) {
    resolvedOptions.extractor = vue2.extractTagsFromSfc
    resolvedOptions.compiler = loadVue2TemplateCompiler(api)
  } else if (vueVersion === 3) {
    resolvedOptions.extractor = vue3.extractTagsFromSfc
  }

  // extend the base webpack configuration
  api.chainWebpack(webpackConfig => {
    // @todo use oneOf so we're not running the loader when it's not required?
    webpackConfig.module
      .rules
      .get('vue')
      // add our custom components loader before the vue-loader
      .use('components')
      .loader(require.resolve('./loader'))
      .options(resolvedOptions)
      .before('vue-loader')
      .end()

  })

  // need to return something for typescript
  return true
}

export default plugin
