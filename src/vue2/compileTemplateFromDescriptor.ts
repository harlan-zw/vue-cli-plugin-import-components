import { loader } from 'webpack';
import { compileTemplate, SFCDescriptor, TemplateCompileOptions } from '@vue/component-compiler-utils'
import { TemplateCompileResultWithMeta } from '../types'
import { VueTemplateCompiler } from '@vue/component-compiler-utils/dist/types'

export default function compileTemplateFromDescriptor (
    this : loader.LoaderContext,
    sfcDescriptor: SFCDescriptor,
    compiler : VueTemplateCompiler
) : TemplateCompileResultWithMeta {
    // for vue-component-compiler
    const tags = new Set<string>()

    const compiled = compileTemplate({
        source:  sfcDescriptor.template.content,
        filename: this.resourcePath,
        compiler,
        prettify: false,
        isProduction: false,
        isFunctional: false,
        // the extra step here is we need to track all of the tags
        compilerOptions: {
            modules: [{
                postTransformNode: node => {
                    tags.add(node.tag)
                }
            }]
        }
    } as TemplateCompileOptions)

    return {
        ...compiled,
        meta: {
            tags
        },
    } as TemplateCompileResultWithMeta
}
