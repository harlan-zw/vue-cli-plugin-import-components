<template>
  <div class="hello">
    <h1>Hello {{ name }}</h1>
  </div>
</template>

<script setup="props">
import { defineProps } from 'vue'
const props = defineProps({ name: String })
</script>
