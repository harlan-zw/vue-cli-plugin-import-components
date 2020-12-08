import { loader } from "webpack"
import {
    compileTemplate,
    SFCDescriptor, SFCTemplateCompileOptions,
} from '@vue/compiler-sfc'
import { SFCTemplateCompileResultsWithMeta } from "../types";

export default function compileTemplateFromDescriptor (
    this : loader.LoaderContext,
    sfcDescriptor: SFCDescriptor
) : SFCTemplateCompileResultsWithMeta {
    // for vue-component-compiler
    const tags = new Set<string>()

    const shortFilePath = this.resourcePath
        .replace(/^(\.\.[\/\\])+/, '')
        .replace(/\\/g, '/')

    const compiled = compileTemplate({
        id: shortFilePath,
        source:  sfcDescriptor.template?.content,
        filename: this.resourcePath,
        prettify: false,
        isProduction: false,
        isFunctional: false,
        // the extra step here is we need to track all of the tags
        compilerOptions: {
            modules: [{
                postTransformNode: (node : any) => {
                    tags.add(node.tag)
                }
            }]
        }
    } as unknown as SFCTemplateCompileOptions)

    return {
        ...compiled,
        meta: {
            tags
        }
    } as SFCTemplateCompileResultsWithMeta
}
