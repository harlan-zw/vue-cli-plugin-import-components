<template>
<div>
  Duplicate import
  <Nested1Component/>
</div>
</template>

<script>
import Nested1Component from './simple/subfolder/Nested1Component'

export default {
  components: {
    Nested1Component
  }
}
</script>
