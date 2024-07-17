import { ref, watch, defineComponent } from 'vue'
import { T, isNil, prefix, withInstall} from "../utils";
import { findItem } from '../cache/dict/index'

const props =  {
  dk: T.string.isRequired,
  ns: T.string.def('CONST'),
  value: T.oneOfType([String, Boolean, Number]),
}

const DSpan = defineComponent({
  name: `${prefix}dSpan`,
  props: props,
  setup(props, { attrs }) {
    const { ns, dk } = props
    const text = ref('')

    const getText = (value) => {
      if (!isNil(value)) {
        findItem(ns, dk, value).then(item => {
          text.value = item.label || ''
        })
      } else {
        text.value = ''
      }
    }

    watch(() => props.value, (val) => {
      getText(val)
    }, {
      immediate: true
    })

    return () => text.value === '' ? null : (<span>{text.value}</span>)
  }
})

export default withInstall(DSpan)