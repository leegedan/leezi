import { computed, defineComponent } from 'vue'
import { useStyle } from './style'

export default defineComponent({
  setup(props, ctx) {
    const { hashId } = useStyle()

    const classes = computed(() => {
      return hashId.value
    })
    return () => {
      return <span class={classes.value}></span>
    }
  },
})
