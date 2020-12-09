import { ServicePlugin, PluginAPI } from "@vue/cli-service";
import {VueCliPluginComponentsOptions, PluginOptions} from './types'
import { extractTagsFromSfc } from './vue3'

const plugin : ServicePlugin = async (api: PluginAPI, options: VueCliPluginComponentsOptions) => {

  const resolvedOptions = Object.assign(
    //default configuration
    {
      path: api.resolve('./src/components'),
      // @todo support vue2 by swapping out the extractor
      extractor: extractTagsFromSfc
    },
    // users provided configuration
    options.pluginOptions?.components
  ) as PluginOptions

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
