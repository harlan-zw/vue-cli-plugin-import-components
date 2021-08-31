import { readFileSync } from 'fs'
import { loader } from 'webpack'
import { SFCDescriptor } from '@vue/compiler-sfc'
import { basename, dirname, relative } from 'upath'

export default function parseSfc(this: loader.LoaderContext, compiler: any): SFCDescriptor {
  const filename = basename(this.resourcePath)
  const context = this.rootContext || process.cwd()
  const sourceRoot = dirname(relative(context, this.resourcePath))

  return compiler.parse(readFileSync(`${sourceRoot}/${filename}`, 'utf8')).descriptor
}
