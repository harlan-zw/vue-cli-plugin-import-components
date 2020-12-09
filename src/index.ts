import { ServicePlugin, PluginAPI } from "@vue/cli-service";
import {VueCliPluginComponentsOptions, PluginOptions} from './types'
import { extractTagsFromSfc } from './vue3'

const plugin : ServicePlugin = async (api: PluginAPI, options: VueCliPluginComponentsOptions) => {

  const resolvedOptions = Object.assign(
    //default configuration
    {
      path: api.resolve('./src/components'),
      extractor: extractTagsFromSfc //api.version === '3' ? require('vue3/extractTagsFromSfc') : require('vue2/extractTagsFromSfc')
    },
    // users provided configuration
    options.pluginOptions?.components
  ) as PluginOptions

  // extend the base webpack configuration
  api.chainWebpack(webpackConfig => {
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
