![](https://laravel-og.beyondco.de/Import%20Components.png?theme=light&packageManager=vue+add&packageName=import-components&pattern=texture&style=style_1&description=Automatically+import+components+in+your+Vue+CLI+app.&md=1&showWatermark=0&fontSize=100px&images=collection)

<h2 align='center'><samp>vue-cli-plugin-import-components</samp></h2>

<p align='center'>Automatically import components in your Vue CLI app with tree shaking, supporting Vue 2 and 3.</p>


## Why?

Manually importing components for Vue out of the box isn't that painful. Whether you import from a central `index.js` or from a relative or absolute paths, 
both work well. 

However, once your project grows, manually importing components soon becomes frustrating. Trying to remember
where components are and refactoring now takes extra time and effort. 

This package removes the frustration by scanning all your components and injecting the imports for them as the components are used, at build time.

The Vue CLI ecosystem was missing this functionality, other frameworks already have it: [Vuetify](https://github.com/vuetifyjs/vuetify), [Nuxt.js](https://github.com/nuxt/components), 
[Vite](https://github.com/antfu/vite-plugin-components), [Chakra](https://github.com/segunadebayo/chakra-ui), etc.


## Features

- :mage: Vue 2 and 3 support with full tree shaking
- :wrench: Easily customise to your project
- :fire: Hot Module Reloading ready
- :triangular_ruler: Written in Typescript

## Setup

Install using Vue CLI. (Vue CLI 4+ is recommended)

```bash
vue add import-components
```

---

:warning: Package is in beta, please report any issues you find.

---

## Usage

Add components to your `components/` folder.

```bash
| components/
---| ComponentFoo.vue
---| ComponentBar.vue
```

Use them in any `.vue` as you would normally. Access your components with either PascalCase or kebab-case.

```html
<template>
<div>
  <ComponentFoo />
  <component-bar />
</div>
</template>
```

Remove `imports` and `components` from the `script` section.


## Configuration

You can change the behaviour of the plugin by modifying the options in `./vue.config.js`. 

```js
// vue.config.js
module.exports = {
  pluginOptions: {
    components: {
      ...
    }
  }
}
```

### Options

All options are optional.

#### path - String

The path used for scanning to find components. Note: It should be relative to your project root. 

Default: `./src/components`

#### pattern - String

Regex to find the files within the `path`. Note: If you omit the pattern it will use the configured `extensions`

Default: `**/*.{${extensions.join(',')},}`

#### ignore - String[]

Regex to ignore files within the `path`. 

Default: `[ '**/*.stories.js' ],`

#### mapComponent - (component : Component) => Component | false

A function which you can use to filter out paths you don't want to be scanned.

For example, if we wanted to access your automatically components only when they're prefixed them with `auto`, you could use the below code.

```js
// vue.config.js
module.exports = {
  pluginOptions: {
    components: {
      // prefix all automatically imported components with an auto prefix
      mapComponent (component) {
        component.pascalCase = 'Auto' + upperFirst(component.pascalCase)
        component.kebabName = 'auto-' + component.pascalCase
        return component
      }
    }
  }
}
```

#### extensions - String[]

When scanning the path for components, which files should be considered components.

Default: `['.js', '.vue', '.ts']`

### Limitations

**Static Imports Only**

Only components that are statically defined within your template will work.

```vue
<template>
  <component :is="dynamicComponent"/>
</template>
```

**Using folders as namespaces**

It is assumed you are using the Vue conventions for naming your components. The below would not work without manually mapping
the components.

```bash
| components/
---| Foo.vue
------| Namespace/Foo.vue
```

It would create a conflict with two components called `Foo.vue`. You should name your component files with the namespace.
i.e `NamespaceFoo.vue`.

**Javascript Components**

You may need to refresh your browser when you are updating them. The hot module reloading 
seems to be a little buggy sometimes.

It's recommended that you stick with `.vue` SFC components.

## License

[MIT](LICENSE)
