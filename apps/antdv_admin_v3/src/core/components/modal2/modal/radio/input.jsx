import Modal from "./modal";
import { computed, defineComponent, ref, toRaw, watch } from "vue";
// import omit from "../../_util/omit";
import pick from "../../_util/pick";
import T from "../../_util/types";
import { SearchOutlined } from "@ant-design/icons-vue";

const defaultInputProps = {};

const Props = Object.assign(
  {},
  pick(Modal.props, [
    "title",
    "width",
    "destroyOnClose",
    "conf",
    "loadData",
    "params",
  ]),
  {
    disabled: T.bool.def(false),
    readOnly: T.bool.def(true),
    model: T.object.def({}),
    bindKeys: T.array.def([]),
    textKey: T.string.isRequired,
    // allow: T.func.def(() => true),
    value: T.oneOfType([String, Number]),
  }
);

const Input = defineComponent({
  props: Props,
  inheritAttrs: false,
  emits: ["change", "update:value"],
  setup(props, { attrs, emit }) {
    const { textKey, bindKeys, readOnly } = props;
    const visible = ref(false);
    const text = ref("");

    const onShowModal = () => {
      // const show = props.allow?.() === true
      visible.value = true;
    };

    watch(
      () => props.value,
      (val) => {
        text.value = val;
      },
      {
        immediate: true
      }
    );

    const onOk = (row) => {
      if (row) {
        sync(row);
      }
      onCancel();
    };

    const onCancel = () => {
      visible.value = false;
    };

    const onClear = () => {
      sync({});
    };

    const onInputText = (txt) => {
      if (readOnly) {
        if (txt === "") {
          onClear();
        }
      } else {
        emit("update:value", txt);
      }
    };

    const sync = (row) => {
      const value = row[textKey];
      /// #mark 添加prop来判断
      // const model = toRaw(props.model);
      const model = props.model;

      bindKeys.forEach((k) => {
        if (Array.isArray(k)) {
          model[k[0]] = row[k[1]];
        } else {
          model[k] = row[k];
        }
      });
      emit("update:value", value);
      emit("change", value, row);
    };

    return () => {
      if (props.disabled) {
        return <a-input value={text.value} disabled></a-input>;
      } else {
        const input = (
          <a-input-group compact class="x-input-modal-wrap">
            <a-input
              value={text.value}
              readOnly={readOnly}
              allowClear={readOnly}
              placeholder="请选择"
              {...attrs}
              onUpdate:value={onInputText}
            ></a-input>
            <a-button
              onClick={onShowModal}
              v-slots={{ icon: () => <SearchOutlined /> }}
            ></a-button>
          </a-input-group>
        );

        const modalProps = pick(props, [
          "title",
          "width",
          "destroyOnClose",
          "conf",
          "loadData",
          "params",
        ]);

        const modal = (
          <Modal
            {...modalProps}
            open={visible.value}
            onOk={onOk}
            onCancel={onCancel}
          ></Modal>
        );
        return (
          <>
            {input}
            {modal}
          </>
        );
      }
    };
  },
});

export default Input;
