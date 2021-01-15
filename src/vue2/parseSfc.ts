import { loader } from 'webpack'
import { readFileSync } from 'fs'
import { basename, dirname, relative } from 'upath'

export default function parseSfc (this : loader.LoaderContext, compiler: any) {
    const filename = basename(this.resourcePath)
    const context = this.rootContext || process.cwd()
    const sourceRoot = dirname(relative(context, this.resourcePath))

    return compiler.parseComponent(readFileSync(sourceRoot + '/' + filename, 'utf8'))
}
