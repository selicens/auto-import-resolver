import type { ComponentResolver } from 'unplugin-vue-components'
import componentMap from './components'
import icons from './icons'

export interface AntdvNextResolverOptions {
  /**
   * Set the components or icons that do not require automatic import.
   *
   * @default []
   */
  exclude?: FilterPattern
  /**
   * Automatically import [@antdv-next/icons](https://www.antdv-next.com/components/icon-cn) icons library.
   *
   * requires package `@antdv-next/icons`
   *
   * @default false
   */
  resolveIcons?: boolean
}

export type FilterPattern = ReadonlyArray<string | RegExp> | string | RegExp | null

function isExclude(name: string, exclude?: FilterPattern): boolean {
  if (!exclude)
    return false

  if (typeof exclude === 'string')
    return name === exclude

  if (exclude instanceof RegExp)
    return !!name.match(exclude)

  if (Array.isArray(exclude)) {
    for (const item of exclude) {
      if (name === item || name.match(item))
        return true
    }
  }
  return false
}

/**
 * Resolver for [Antdv Next](https://antdv-next.com)
 */
export function AntdvNextResolver(options?: AntdvNextResolverOptions): ComponentResolver {
  return {
    type: 'component',
    resolve: (name: string) => {
      const opts = Object.assign({}, options)

      if (isExclude(name, opts.exclude)) {
        return
      }

      if (opts.resolveIcons && icons.includes(name)) {
        return {
          as: name,
          from: `@antdv-next/icons/icons/${name}`,
        }
      }

      const importName = componentMap[name]![0]!.name
      if (importName) {
        if (isExclude(importName, opts.exclude)) {
          return
        }
        const asName = componentMap[name]![0]!.as || 'default'

        return {
          name: asName,
          as: componentMap[name]![0]!.as,
          from: `antdv-next/dist/${componentMap[name]![0]!.path}/index`,
        }
      }
    },
  }
}
