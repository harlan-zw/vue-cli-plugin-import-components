import { loader } from 'webpack'
import { uniq, map, kebabCase } from 'lodash'
import { SFCTemplateCompileResults } from '@vue/compiler-sfc'
import { PluginOptions } from '../types'
import parseSfc from './parseSfc'
import compileTemplateFromDescriptor from './compileTemplateFromDescriptor'

export default function extractTagsFromSfc(this: loader.LoaderContext, options: PluginOptions): Array<string> | false {
  // parse the SFC component and get a descriptor
  const sfcDescriptor = parseSfc.call(this, options.compiler)

  // compile the template content from the descriptor
  const compiled = compileTemplateFromDescriptor.call(this, sfcDescriptor, options.compiler) as SFCTemplateCompileResults

  if (compiled && compiled.ast) {
    const tags = compiled.ast.components
    // return all unique tags as kebab case
    return uniq(map(tags, tag => kebabCase(tag)))
  }
  return false
}
