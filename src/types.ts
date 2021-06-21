import { ProjectOptions } from '@vue/cli-service'

export interface Component {
  pascalName: string
  kebabName: string
  import: string
  filePath: string
  shortPath: string
}

export enum Extensions {
  ts,
  js,
  vue
}

export interface TagExtractor {
  // eslint-disable-next-line no-use-before-define
  (options: PluginOptions): Array<string> | false
}

export interface PluginOptions {
  // user options
  path: string
  pattern: string
  ignore: string[]
  extensions: Extensions[]
  mapComponent?: (component: Component) => Component | false

  // hidden options
  extractor: TagExtractor
  vueVersion: 2 | 3
  compiler: any
}

export interface VueCliPluginComponentsOptions extends ProjectOptions {
  pluginOptions?: {
    components?: PluginOptions
  }
}

export interface ScanDir {
  path: string
  pattern?: string | string[]
  ignore?: string[]
  extensions: string[]
}
