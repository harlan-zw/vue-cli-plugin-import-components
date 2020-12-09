import { ProjectOptions } from "@vue/cli-service"

export interface PluginOptions {
  path: string
  extractor: any
  extensions?: Array<string>
  pattern?: string
  ignore?: string
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
  prefix?: string
  extensions?: Array<string>
}


export interface Component {
  pascalName: string
  kebabName: string
  import: string
  asyncImport?: string
  resourcePath?: string
  export: string
  filePath: string
  shortPath: string
  async?: boolean
  chunkName: string
  global?: boolean
  level?: number
}
