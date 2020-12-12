![](https://laravel-og.beyondco.de/Import%20Components.png?theme=light&packageManager=vue+add&packageName=import-components&pattern=texture&style=style_1&description=Automatically+import+components+in+your+Vue+CLI+app.&md=1&showWatermark=0&fontSize=100px&images=collection)

<h2 align='center'><samp>vue-cli-plugin-import-components</samp></h2>

<p align='center'>Automatically import components in your Vue CLI app, supporting Vue 2 and 3.</p>


---

:construction_worker: Note this is still an experimental build. Use with caution.

---

## Features

- :mage: Automatically import components as you need them
- :wrench: Easily customisable to your project
- :fire: Hot Module Reloading Supported
- :triangular_ruler: Written in Typescript

## Setup

Install using Vue CLI. (Vue CLI 4+ is recommended)

```bash
vue add import-components
```

## Usage

Add components to your `components/` folder and use them in any `.vue` file straight away.

```bash
| components/
---| ComponentFoo.vue
---| ComponentBar.vue
```

Access your components with either pascal and kebab-case naming.

```html
<template>
<div>
  <ComponentFoo />
  <component-bar />
</div>
</template>
```

Remove manual component `imports` from the `script` section. Remove the `components` section
from your script file.


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
