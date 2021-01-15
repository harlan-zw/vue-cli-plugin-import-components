import { loader } from 'webpack';
import { getOptions } from 'loader-utils';
import { matcher, scanComponents } from './util/scanComponents'
import { injectComponents } from './util/injectComponents'
import { PluginOptions, Component } from './types'
import { resolve } from 'upath'

export default async function loader (this : loader.LoaderContext, source: string) {

  this.cacheable()

  const loaderContext : loader.LoaderContext = this

  // bail out if we're dealing with a resource with a query
  // we only want to be dealing with the 'virtual-module' of the SFC
  if (loaderContext.resourceQuery) {
    return source
  }

  const options = getOptions(loaderContext) as unknown as PluginOptions;

  const tags = options.extractor.call(this, options) as Array<string>

  // we only need to match the tags if we have some
  if (!tags || tags.length <= 0) {
    return source
  }

  const scannedComponents = await scanComponents(options, resolve('./src'))

  // make sure cache invalidation and recompile in watch mode
  scannedComponents.forEach(c => this.addDependency(c.filePath))

  // the components to import
  const components : Component[] = matcher(tags, scannedComponents)

  // only if we have components to inject
  if (components.length <= 0) {
    return source
  }

  return injectComponents(source, components)
}

