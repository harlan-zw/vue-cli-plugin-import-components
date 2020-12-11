import { loader } from 'webpack'
import parseSfc from './parseSfc'
import compileTemplateFromDescriptor from './compileTemplateFromDescriptor'
import { uniq, map, kebabCase } from 'lodash'
import { PluginOptions } from '../types'
import { SFCTemplateCompileResults } from '@vue/compiler-sfc'

export default function extractTagsFromSfc (this : loader.LoaderContext, options : PluginOptions) : Array<string> | undefined {

  // parse the SFC component and get a descriptor
  const sfcDescriptor = parseSfc.call(this)

  // compile the template content from the descriptor
  const compiled = compileTemplateFromDescriptor.call(this, sfcDescriptor) as SFCTemplateCompileResults

  if (compiled && compiled.ast) {
    let tags = compiled.ast.components
    // return all unique tags as kebab case
    return uniq(map(tags, tag => kebabCase(tag)))
  }

  return
}
