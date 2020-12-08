import { loader } from "webpack"
import parseSfc from './parseSfc'
import compileTemplateFromDescriptor from './compileTemplateFromDescriptor'
import { VueTemplateCompiler } from "@vue/component-compiler-utils/dist/types"

export default function extractTagsFromSfc (this : loader.LoaderContext) : Set<string> {

    const compiler = require('vue-template-compiler') as VueTemplateCompiler

    // parse the SFC component and get a descriptor
    const sfcDescriptor = parseSfc.call(this, compiler)

    // compile the template content from the descriptor
    const { tags } = compileTemplateFromDescriptor.call(this, sfcDescriptor, compiler)

    return tags
}
