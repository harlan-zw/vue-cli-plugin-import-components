# @loonpwn/vue-cli-plugin-components

> Plugin to scan and auto import components for Vue CLI - Vue 3

## Table of Contents

- [Features](#features)
- [Usage](#usage)
- [Directories](#directories)
- [Plugin Options](#plugin-options)
- [License](#license)

## Features

- Scan and auto import components
- Multiple paths with customizable prefixes and lookup/ignore patterns
- Hot reloading Support
- Fully tested!

## Usage

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

## Gotchas

- Dynamic components do not work
- Components in nested folders need to contain the namespace


## Directories

By default, the `./components` directory will be included.
However, you can customize the plugin's behaviour by providing directories to scan:

```js
// vue-cli.config.js 

export default {
  components: [
    './src/components',
    './src/my-other-folder',
  ],
}
```

### Plugin Options

// tbc

## License

[MIT](LICENSE)
