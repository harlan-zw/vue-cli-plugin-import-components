module.exports = api => {
  api.render('./template')
  api.injectImports(api.entryFile, '')
}