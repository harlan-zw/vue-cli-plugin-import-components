import { loader } from 'webpack'
import { parse, SFCDescriptor } from '@vue/compiler-sfc'
import { readFileSync } from 'fs'
import { basename, dirname, relative } from 'path'

export default function parseSfc (this : loader.LoaderContext) : SFCDescriptor {
    const filename = basename(this.resourcePath)
    const context = this.rootContext || process.cwd()
    const sourceRoot = dirname(relative(context, this.resourcePath))

    return parse(readFileSync(sourceRoot + '/' + filename, 'utf8')).descriptor
}