<template>
<div>
  <component-a/>
  <component-b/>
  <component-c/>
</div>
</template>

<script>
import {Vue, Component} from 'vue-property-decorator'

@Component
export default class PropertyDecoratorComponent extends Vue {
}
</script>
