import { loader as webpackLoader } from 'webpack'
import { getOptions } from 'loader-utils'
import { resolve } from 'upath'
import { matcher, scanComponents } from './util/scanComponents'
import { PluginOptions, Component } from './types'

export default async function loader(this: webpackLoader.LoaderContext, source: string) {
  this.cacheable()

  // bail out if we're dealing with a resource with a query
  // we only want to be dealing with the 'virtual-module' of the SFC
  if (this.resourceQuery)
    return source

  const options = getOptions(this) as unknown as PluginOptions

  const tags = options.extractor.call(this, options)

  // we only need to match the tags if we have some
  if (!tags || tags.length <= 0)
    return source

  const scannedComponents = await scanComponents(options, resolve('./src'))

  // make sure cache invalidation and recompile in watch mode
  scannedComponents.forEach(c => this.addDependency(c.filePath))

  const generateLazyLoadImport = (c: Component) => {
    if (options.vueVersion === 3)
      return `Lazy${c.pascalName}: defineAsyncComponent(() => import('${c.shortPath.replace(';', '')}'))`

    return `Lazy${c.pascalName}: () => import('${c.shortPath.replace(';', '')}')`
  }

  const componentsWithLazyImports = scannedComponents.map(c => [c, {
    ...c,
    pascalName: `Lazy${c.pascalName}`,
    import: generateLazyLoadImport(c),
    kebabName: `lazy-${c.kebabName}`,
    lazy: true,
  } as Component])
    .flat()

  // the components to import
  const components: Component[] = matcher(tags, componentsWithLazyImports)

  // only if we have components to inject
  if (components.length <= 0)
    return source

  return options.injector.call(this, source, components)
}
