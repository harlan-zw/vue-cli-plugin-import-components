![](https://laravel-og.beyondco.de/Components.png?theme=light&packageManager=yarn+add&packageName=%40loonpwn%2Fvue-cli-plugin-components&pattern=texture&style=style_1&description=Automatically+import+components+in+Vue+CLI.&md=1&showWatermark=0&fontSize=100px&images=collection)

<h2 align='center'><samp>vue-cli-plugin-components</samp></h2>

<p align='center'>A Vue CLI Plugin to automatically import all of your components.</p>


---

:construction_worker: Note this is still an experimental build. Use with caution.

---

## Features

:mage: Automatically import components as you need them
:wrench: Easily customisable to your project
:fire: Hot Module Reloading Supported
:triangular_ruler: Written for stability with typescript and unit tests

## Setup

Install using Vue CLI

```bash
vue add @loonpwn/vue-cli-plugin-component
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
  <ComponentFoo />
  <component-bar />
</template>
```

Remove manual component `imports` from the `script` section. Remove the `components` section
from your script file.


## Configuration

Out of the box the plugin is configured to read all `.vue, .js, .ts` files from the `~/components` folder.

To customise the default behavior either use the Vue UI or manually add to your `vue.config.js`

```js
// vue.config.js
module.exports = {
  pluginOptions: {
    components: {
      paths: [
        // paths
        {
          path: '~/components',
          extensions: [ '.vue' ],
          filter: component => true,
        },
        {
          path: '~/theme/components',
          extensions: ['.js', '.vue']
        },
      ]
    }
  }
}
```

### Options

Either install the package with the Vue CLI or use the gui.

`vue add @loonpwn/vue-cli-plugin-components`

**Note:** The package only works with Vue 3 for now.

**Create your components:**

```bash
| components/
---| ComponentFoo.vue
---| ComponentBar.vue
```

**Use them whenever you want, they will be auto imported in `.vue` files :**

```html
<template>
  <ComponentFoo />
  <component-bar />
</template>
```

No need anymore to manually import them in the `script` section!


### Limitations

**Static Imports Only**

Only components that are statically defined within your template will work. If you are a dynamic template you will still
need to manually import.

```vue
<template>
  <component :is="dynamicComponent"/>
</template>
```

**Using folders as namespaces**

It is assumed you are using the Vue conventions for naming your components. The below would not work.

```bash
| components/
---| Foo.vue
------| Namespace/Foo.vue
```

It would create a conflict with two components called `Foo.vue`. You should name your component files with the namespace.
i.e `NamespaceFoo.vue`.

## License

[MIT](LICENSE)
