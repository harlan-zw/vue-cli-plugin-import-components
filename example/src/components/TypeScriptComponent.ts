import { defineComponent, h } from 'vue'

export default defineComponent({
  data() {
    return {
      message: 'Hello!'
    }
  },
  render () {
    return h('div', this.message)
  },
})
