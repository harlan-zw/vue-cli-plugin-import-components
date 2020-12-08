import { loader } from "webpack"
import { parse, SFCDescriptor } from "@vue/component-compiler-utils"
import { ParseOptions } from "@vue/component-compiler-utils/lib/parse"
import { VueTemplateCompiler } from "@vue/component-compiler-utils/dist/types"
import { readFileSync } from 'fs'
import { basename, dirname, relative } from 'path'

export default function parseSfc (this : loader.LoaderContext, compiler : VueTemplateCompiler) : SFCDescriptor {
    const filename = basename(this.resourcePath)
    const context = this.rootContext || process.cwd()
    const sourceRoot = dirname(relative(context, this.resourcePath))

    const options : ParseOptions = {
        source: readFileSync(sourceRoot + '/' + filename, 'utf8'),
        compiler,
        needMap: false,
    }

    return parse(options)
}