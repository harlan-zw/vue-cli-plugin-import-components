<template>
<div class="app">
  <table width="500" style="margin: 0 auto;">
    <tr>
      <td>
        <code>ComponentA.vue</code>
      </td>
      <td>
        <component-a></component-a>
      </td>
    </tr>
    <tr>
      <td>
        <code>ImgComponent.vue</code>
      </td>
      <td>
        <ImgComponent></ImgComponent>
      </td>
    </tr>
    <tr>
      <td>
        <code>ScopedStyles.vue</code>
      </td>
      <td>
        <scoped-styles/>
      </td>
    </tr>
    <tr>
      <td>
        <code>Nested2Component.vue</code>
      </td>
      <td>
        <Nested2Component/>
      </td>
    </tr>
    <tr>
      <td>
        <code>PugComponent.vue</code>
      </td>
      <td>
        <PugComponent/>
      </td>
    </tr>
    <tr>
      <td>
        <code>DuplicateImport.vue</code>
      </td>
      <td>
        <DuplicateImport/>
      </td>
    </tr>
    <tr>
      <td>
        <code>ChainedImport.vue</code>
      </td>
      <td>
        <ChainedImport/>
      </td>
    </tr>
    <tr>
      <td>
        <code>FunctionalComponent.vue</code>
      </td>
      <td>
        <FunctionalComponent/>
      </td>
    </tr>
    <tr>
      <td>
        <code>JavascriptComponent.vue</code>
      </td>
      <td>
        <javascript-component/>
      </td>
    </tr>
    <tr>
      <td>
        <code>SplitComponent.vue</code>
      </td>
      <td>
        <SplitComponent/>
      </td>
    </tr>
  </table>
</div>
</template>

<script>
import SplitComponent from "@/components/SplitComponent";
export default {
  name: 'App',
  components: { SplitComponent },
}
</script>

<style>
.app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
