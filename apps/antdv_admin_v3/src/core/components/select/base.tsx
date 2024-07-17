import { defineComponent, defineProps, ref, shallowRef } from "vue";
import { Select } from "ant-design-vue";
import {T, copy, omit, useState} from "../utils";

const Props = copy(Select.props, {
  data: T.func.isRequired,
});

const BaseSelect = defineComponent({
  name: "BaseSelect",
  props: Props,
  emits: ["change"],
  setup(props, { emit, slots }) {
    const { data: fetchData } = props;
    const loading = ref(false);
    const options = shallowRef([]);

    const loadData = () => {
      loading.value = true;
      fetchData().then((data) => {
        loading.value = false;
        options.value = data;

      });
    };

   
    loadData();

    return () => {
      const selectProps = omit(props, [
        "load",
      ]);


      return (
        <a-select
          {...selectProps}
          options={options.value}
          loading={loading.value}
          v-slots={slots}
        ></a-select>
      );
    };
  },
});

export default BaseSelect;
