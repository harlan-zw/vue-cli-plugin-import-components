import { ServicePlugin, PluginAPI } from '@vue/cli-service'
import { VueCliPluginComponentsOptions, PluginOptions, TagExtractor } from './types'
import * as vue3 from './vue3'
import * as vue2 from './vue2'
import { existsSync, mkdirSync } from 'fs'
const {
  semver,
  loadModule,
  error,
  info
} = require('@vue/cli-shared-utils')

function loadVue2TemplateCompiler (api : PluginAPI) {
  return loadModule('vue-template-compiler', api.service.context)
    || loadModule('vue-template-compiler', __dirname)
}

const plugin : ServicePlugin = (api: PluginAPI, options: VueCliPluginComponentsOptions) => {

  const extensions =  ['vue', 'js', 'ts']
  const pluginOptions = Object.assign(
    //default configuration
    {
      path: './src/components',
      pattern: `**/*.{${extensions.join(',')},}`,
      extensions,
      ignore: [
        '**/*.stories.js', // ignore storybook files
      ],
    },
    // users provided configuration
    options.pluginOptions?.components
  ) as PluginOptions

  // resolve the configured path
  pluginOptions.path = api.resolve(pluginOptions.path)

  // check the components path exists
  if (!existsSync(pluginOptions.path)) {
    // if not we should create it so we don't error out
    mkdirSync(pluginOptions.path)
    // warn the user, possible misconfiguration?
    info('The components path "' +  pluginOptions.path + '" was created.', 'vue-cli-plugin-components')
  }

  const vue = loadModule('vue', api.service.context) || loadModule('vue', __dirname)
  if (!vue) {
    error('Aborting, failed to load vue module.', 'vue-cli-plugin-components')
    return
  }

  const vueVersion = semver.major(vue.version)
  pluginOptions.vueVersion = vueVersion

  if (vueVersion === 2) {
    pluginOptions.extractor = vue2.extractTagsFromSfc as TagExtractor
    pluginOptions.compiler = loadVue2TemplateCompiler(api)
  } else if (vueVersion === 3) {
    pluginOptions.extractor = vue3.extractTagsFromSfc as TagExtractor
  } else {
    error('Aborting, vue version ' + vueVersion + ' not supported', 'vue-cli-plugin-components')
    return
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
      .options(pluginOptions)
      .before('vue-loader')
      .end()

  })

  // need to return something for typescript
  return true
}

export default plugin
