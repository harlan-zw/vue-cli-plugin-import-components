![](https://laravel-og.beyondco.de/Components.png?theme=light&packageManager=yarn+add&packageName=%40loonpwn%2Fvue-cli-plugin-components&pattern=texture&style=style_1&description=Automatically+import+components+in+your+Vue+CLI+app.&md=1&showWatermark=0&fontSize=100px&images=collection)

<h2 align='center'><samp>vue-cli-plugin-components</samp></h2>

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

#### path

The path used for scanning to find components.

Default: `~/components`

#### extensions

Default: `['.js', '.vue', '.ts']`

#### filter

A function which you can use to filter out paths you don't want to be scanned.

```js
// vue.config.js
module.exports = {
  pluginOptions: {
    components: {
      filter (path) {
        return path.match(/regex/)
      }
    }
  }
}
```


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

**Javascript Components**

You may need to refresh your browser when you are updating them. The hot module reloading 
seems to be a little buggy sometimes.

It's recommended that you stick with `.vue` SFC components.

## License

[MIT](LICENSE)
