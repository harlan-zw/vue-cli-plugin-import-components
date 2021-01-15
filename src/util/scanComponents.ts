import { basename, extname, join, dirname, resolve } from 'upath'
import globby from 'globby'
import { camelCase, kebabCase, upperFirst, first, filter } from 'lodash'
import type { Component, PluginOptions } from '../types'

const pascalCase = (str: string) => upperFirst(camelCase(str))
const isWindows = process.platform.startsWith('win')

export async function scanComponents (options : PluginOptions, srcDir: string): Promise<Component[]> {
  const components: Component[] = []
  const filePaths = new Set<string>()
  const scannedPaths: string[] = []

  const { path, pattern, ignore = [] } = options

  const resolvedNames = new Map<string, string>()

  for (const _file of await globby(pattern!, { cwd: path, ignore })) {
    let filePath = resolve(join(path, _file))

    if (scannedPaths.find(d => filePath.startsWith(d))) {
      continue
    }

    if (filePaths.has(filePath)) {
      continue
    }
    filePaths.add(filePath)

    let fileName = basename(filePath, extname(filePath))
    if (fileName === 'index') {
      fileName = basename(dirname(filePath), extname(filePath))
    }

    if (resolvedNames.has(fileName)) {
      // eslint-disable-next-line no-console
      console.warn(`Two component files resolving to the same name \`${fileName}\`:\n` +
        `\n - ${filePath}` +
        `\n - ${resolvedNames.get(fileName)}`
      )
      continue
    }
    resolvedNames.set(fileName, filePath)

    const pascalName = pascalCase(fileName)
    const kebabName = kebabCase(fileName)
    const shortPath = filePath.replace(srcDir, '@')

    // istanbul ignore if
    if (isWindows) {
      filePath = filePath.replace(/\\/g, '\\\\')
    }

    let component = {
      filePath,
      pascalName,
      kebabName,
      shortPath,
    } as Component

    let resolvedComponent = component as Component | false
    // allow someone to configure the component mapping
    if (options.mapComponent) {
      resolvedComponent = options.mapComponent(component)
    }

    // if a component was resolved as false, then we shouldn't push it
    if (resolvedComponent) {
      // resolve the import variable in case the user wanted to modify paths or the casing
      resolvedComponent.import = `import ${pascalName} from "${shortPath}";`
      components.push(resolvedComponent)
    }
  }

  scannedPaths.push(path)
  return components
}

/**
 * Match tags to components.
 *
 * @param tags An array of unique tags, should be unique for casing already
 * @param componentsToMatch Array of components from your project
 */
export function matcher (tags: string[], componentsToMatch: Component[]) {

  const components : Component[] = []
  tags.forEach(tag => {
    const component = first(
      filter(componentsToMatch, (component : Component) => {
        return tag === component.pascalName || tag === component.kebabName
      })
    ) as Component | null
    if (component) {
      components.push(component)
    }
  })
  return components
}
