import { ref, watch, defineComponent } from 'vue'
import { Tag } from 'ant-design-vue';
import { T, copy, omit, isNil, prefix, withInstall} from "../utils";
import { findItem } from '../cache/dict/index'


const props =  copy(Tag.props, {
  dk: T.string.isRequired,
  ns: T.string.def('CONST'),
  value: T.oneOfType([String, Boolean, Number]),
})

const DTag = defineComponent({
  name: `${prefix}DTag`,
  props: props,
  setup(props, { attrs }) {
    const { ns, dk } = props
    const text = ref('')

    const getText = async (value) => {
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

    return () => {
      const tagProps = omit(props, ['dk', 'ns', 'value'])
      return text.value === '' ? null : (<Tag {...tagProps}>{text.value}</Tag>)
    }
  }
})

export default withInstall(DTag)