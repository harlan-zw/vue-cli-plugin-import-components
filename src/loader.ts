import { loader } from 'webpack';
import Debug from 'debug'
import { getOptions } from 'loader-utils';
import { scanComponents } from './util/scanComponents'
import { PluginOptions, ScanDir, Component } from './types'
import { join, dirname } from 'path'
import { filter, first } from 'lodash'

const debug = Debug('vue-cli-plugin-components:loader')

export default async function loader (this : loader.LoaderContext, source: string) {

    // this.async()
    // this.cacheable()

    const loaderContext : loader.LoaderContext = this

    // bail out if we're dealing with a resource with a query
    // we only want to be dealing with the 'virtual-module' of the SFC
    if (loaderContext.resourceQuery) {
        return source
    }

    const options = getOptions(loaderContext) as unknown as PluginOptions;

    console.log(options)

    const extensions = ['vue', 'js']

    debug('Scanning path: ' + join(loaderContext.rootContext, options.path))

    console.log('path', dirname(this.resourcePath.substring(this.rootContext.length + 1)))

    const scannedComponents = await scanComponents.call(this, [
        {
            path: join(loaderContext.rootContext, options.path),
            extensions: extensions,
            pattern: `**/*.{${extensions.join(',')},}`,
            ignore: [
                '**/*.stories.js', // ignore storybook files
            ],
        }
    ] as ScanDir[], this.context)


    const tags = options.extractor.call(this) as Array<string> | undefined

    console.log(tags)

    // we only need to match the tags if we have some
    if (!tags || tags.length <= 0) {
        return source
    }

    // the components to import
    const components : Array<Component> = []

    tags.forEach(tag => {
        const component = first(
            filter(scannedComponents, (component : Component) => {
                return tag === component.pascalName || tag === component.kebabName
            })
        ) as Component | null
        if (component) {
            components.push(component)
        }
    })

    console.log(components)

    // only if we have components to inject
    if (components.length <= 0) {
        return source
    }

    console.log('to import', components, 'tags', tags)

    source += '\nconsole.log(script);'

    const newContent =
        `/* vue-cli-plugin-components */\n` +
        components.map(c => c.import).join('\n') + '\n' +
        `script.components = Object.assign({}, { ${components.map(c => c.pascalName).join(', ')} }, script.components);`

    const hotReload = source.indexOf('/* hot reload */')
    if (hotReload > -1) {
        source = source.slice(0, hotReload) + newContent + '\n\n' + source.slice(hotReload)
    }
    console.log(source)


    return source
}

