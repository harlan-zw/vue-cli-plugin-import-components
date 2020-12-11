import { ProjectOptions } from '@vue/cli-service'

export interface PluginOptions {
  path: string
  extractor: any
  vueVersion: number
  compiler: any
  extensions?: Array<string>
  filter?: (path : string) => boolean
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
