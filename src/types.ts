import { ProjectOptions } from '@vue/cli-service'

export interface TagExtractor {
  (options: PluginOptions) : Array<string>
}

export enum Extensions {
  ts,
  js,
  vue
}

export interface PluginOptions {
  // scan component options
  path: string
  pattern: string
  ignore: string[]
  extensions: Extensions[]

  extractor: TagExtractor

  vueVersion: 2 | 3
  compiler: any
  filter?: (component : Component) => boolean
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


export interface Component {
  pascalName: string
  kebabName: string
  import: string
  filePath: string
  shortPath: string
}
