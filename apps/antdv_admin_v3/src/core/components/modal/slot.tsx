
import { computed, defineComponent, ref, toRaw, watch } from 'vue'
import SearchModal, { xsmProps } from './search'
import { omit, T, copy, prefix, isArray, pick } from '../utils/index'

const SxsModal = defineComponent({
  inheritAttrs: false,
  emits: ["change", "update:visible"],
  props: xsmProps(),
  setup(props, { emit, slots }) {
    const handleOk = (rows) => {
      emit("update:visible", false);
      emit("change", rows);
    };

    const handleCancel = () => {
      emit("update:visible", false);
    };

    return () => {
     
      return (
        <>
          {slots.defulat?.()}
          <SearchModal
            {...props}
            onOk={handleOk}
            onCancel={handleCancel}
          ></SearchModal>
        </>
      );
    };
  },
});

export default SxsModal
