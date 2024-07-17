import ModalC from "../checkbox/modal";
import ModalR from "../radio/modal";
import { computed, defineComponent, ref, toRaw, watch } from "vue";
// import omit from "../../_util/omit";
import pick from "../../_util/pick";
import T from "../../_util/types";

const Props = Object.assign(
  {
    visible: T.bool.def(false),
    multi: T.bool.def(true)
  },
  pick(ModalC.props, [
    "title",
    "width",
    "destroyOnClose",
    "conf",
    "loadData",
    "params",
  ])
);

const XModal = defineComponent({
  inheritAttrs: false,
  emits: ["change", "update:visible"],
  props: Props,
  setup(props, { emit, slots }) {
    const handleOk = (rows) => {
      emit("update:visible", false);
      emit("change", rows);
    };

    const handleCancel = () => {
      emit("update:visible", false);
    };

    return () => {
      const { visible, multi, ...rest } = props;
      const Modal = multi ? ModalC : ModalR
      return (
        <>
          {slots.defulat?.()}
          <Modal
            {...rest}
            open={visible}
            onOk={handleOk}
            onCancel={handleCancel}
          ></Modal>
        </>
      );
    };
  },
});

export default XModal
