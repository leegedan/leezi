import { Checkbox } from "element-ui";
import { prefix } from "../utils/const";

const componentName = `${prefix}Switch`;

const Props = Object.assign({}, Checkbox.props, {
  on: {
    type: [Boolean, String, Number],
    default: "Y",
  },
  off: {
    type: [Boolean, String, Number],
    default: "N",
  },
  value: {
    type: [Boolean, String, Number],
  },
});

export default {
  name: componentName,
  data() {
    return {};
  },
  model: {
    prop: "value",
    event: "change",
  },
  props: Props,
  created() {
    if (!this.check()) {
      this.$emit("change", this.off);
    }
  },
  methods: {
    handleChange(checked) {
      const val = checked ? this.on : this.off;
      this.$emit("change", val);
    },
    check() {
      return this.value === this.on;
    },
  },

  render() {
    const props = {};
    Object.keys(Checkbox.props).forEach((k) => {
      if (undefined !== this[k]) {
        props[k] = this[k];
      }
    });
    props.checked = this.check();
    return <Checkbox props={props} onChange={this.handleChange}></Checkbox>;
  },
};
