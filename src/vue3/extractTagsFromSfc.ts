import { loader } from "webpack";
import parseSfc from './parseSfc'
import compileTemplateFromDescriptor from './compileTemplateFromDescriptor'

export default function extractTagsFromSfc (this : loader.LoaderContext) : Array<string> | undefined {

    // parse the SFC component and get a descriptor
    const sfcDescriptor = parseSfc.call(this)

    // compile the template content from the descriptor
    const compiled = compileTemplateFromDescriptor.call(this, sfcDescriptor)

    return compiled.ast?.components
}
