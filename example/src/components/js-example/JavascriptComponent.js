import { h, reactive } from 'vue'

export default {
  setup(props, { slots, attrs, emit }) {
    const state = reactive({
      count: 0
    })

    function increment() {
      state.count++
    }

    // return the render function
    return () =>
      h(
        'div',
        {
          onClick: increment
        },
        'Counter 🐭: ' + state.count
      )
  }
}
