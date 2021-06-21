import { loader } from 'webpack'
import {
  SFCDescriptor, SFCTemplateCompileOptions, SFCTemplateCompileResults,
} from '@vue/compiler-sfc'

export default function compileTemplateFromDescriptor(
  this: loader.LoaderContext,
  sfcDescriptor: SFCDescriptor,
  compiler: any,
): SFCTemplateCompileResults | undefined {
  // check we have a template to work with
  if (!sfcDescriptor?.template?.content)
    return

  let content = sfcDescriptor.template.content

  // need to compile pug to html so that we can compile it using the vue/compiler-sfc
  if (sfcDescriptor.template.lang === 'pug') {
    const pug = require('pug')
    content = pug.render(content, { filename: this.resourcePath })
  }

  const shortFilePath = this.resourcePath
    .replace(/^(\.\.[\/\\])+/, '')
    .replace(/\\/g, '/')

  return compiler.compileTemplate({
    id: shortFilePath,
    source: content,
    filename: this.resourcePath,
    prettify: false,
  } as unknown as SFCTemplateCompileOptions)
}
