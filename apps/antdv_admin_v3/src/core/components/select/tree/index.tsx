import { TreeSelect } from "ant-design-vue";
import { defineComponent, ref, shallowRef } from "vue";
import { omit } from "../../utils";

const Props = Object.assign({}, TreeSelect.props, {
  data: {
    type: Function,
    default: () => [],
  },
});

const XTreeSelect = defineComponent({
  name: "XTreeSelect",
  emits: ["loaded", "change"],
  props: Props,
  setup(props, { emit, slots }) {
    const { data: fetchData } = props;
    const treeData = shallowRef([]);

    const loadData = () => {
      fetchData().then((data) => {
        treeData.value = data;
        emit("loaded", data);
      });
    };

    const onChange = (value, label, extra) => {
      emit("change", value, label, extra, treeData.value);
    };

    loadData();

    return () => {
      const innerProps = {
        ...omit(props, ["load", "onChange"]),
        showSearch: true,
        treeNodeFilterProp: "title",
        dropdownStyle: { maxHeight: "400px", overflow: "auto" },
        placeholder: props.placeholder || "请选择",
        allowClear: true,
        treeDefaultExpandAll: true,
        treeData: treeData.value,
        onChange,
        // style: { width: "100%" },
      };

      return <TreeSelect {...innerProps} v-slots={slots}></TreeSelect>;
    };
  },
});

export default XTreeSelect;
