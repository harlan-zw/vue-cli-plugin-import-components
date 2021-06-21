<template>
<div class="app">
  <v-app>
    <v-main>
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
        <tr>
          <td>
            <code>PropertyDecoratorComponent.vue</code>
          </td>
          <td>
            <PropertyDecoratorComponent/>
          </td>
        </tr>
        <tr>
          <td>
            <code>Nested Global Component</code>
          </td>
          <td>
            <ValidationObserver>
              <FiltersForm>
                This should work
              </FiltersForm>
            </ValidationObserver>
          </td>
        </tr>
        <tr>
          <td>
            <code>Vuetify button</code>
          </td>
          <td>
            <v-btn>Test</v-btn>
          </td>
        </tr>
      </table>
    </v-main>
  </v-app>
</div>
</template>

<script>
import HelloWorld from './components/HelloWorld';

export default {
  name: 'App',

  components: {
    HelloWorld,
  },

  data: () => ({
    //
  }),
};
</script>
