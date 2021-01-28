<template>
<div class="hello">
  <button @click="inc">
    <NestedSetupComponent :name="count">Hello</NestedSetupComponent>
  </button>
</div>
</template>

<script setup>
import { ref } from 'vue'

const count = ref(0)
const inc = () => count.value++
</script>
