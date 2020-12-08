import * as webpack from "webpack";
import {compileTemplate, SFCDescriptor, TemplateCompileOptions} from "@vue/component-compiler-utils";
import {TemplateCompileResultWithMeta} from "../types";
import {VueTemplateCompiler} from "@vue/component-compiler-utils/dist/types";
const compiler = require('vue-template-compiler') as VueTemplateCompiler

export default function compileTemplateFromDescriptor (this : webpack.loader.LoaderContext, sfcDescriptor: SFCDescriptor) : TemplateCompileResultWithMeta {
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
        tags,
    }
}
