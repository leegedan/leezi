import { message } from "ant-design-vue";
import { ref, shallowRef, reactive, toRaw } from "vue";
import { Form } from "ant-design-vue";

/**
 *
 * @param {Function} saveForm
 * @param {Object} rules
 * @returns
 */
export function usePage(saveForm, rules) {
  const q = ref({});
  const m = ref({});
  const tableRef = ref();
  const formRef = ref();
  const visible = ref(false);

  let validate;
  let resetFields;

  if (rules) {
    const formHook = Form.useForm(m, reactive(rules));
    validate = () => formHook.validate();
    resetFields = () => formHook.resetFields();
  } else {
    /// 这属于约定
    validate = () => formRef.value?.validate();
    resetFields = () => formRef.value?.resetFields();
  }

  const refresh = () => {
    /// 这属于约定
    tableRef.value?.refresh();
  };

  const success = (re = true) => {
    message.success("操作成功");
    re && refresh();
  };

  const fail = () => {
    message.error("操作失败");
  };

  const tip = (result) => {
    if (result.code === 200) {
      success();
    } else {
      fail();
    }
  };

  const handleNew = () => {
    m.value = { action: "create" };
    visible.value = true;
  };

  const handleEdit = (r) => {
    m.value = { ...r, action: "create" };
    visible.value = true;
  };

  const handleSearch = () => {
    refresh();
  };

  const handleReset = () => {
    q.value = {};
  };

  const onCancel = () => {
    visible.value = false;
  };

  const onOk = () => {
    validate()
      .then((x) => {
        saveForm(toRaw(m)).then(tip);
        onCancel();
      })
      .catch((e) => {});
  };

  return {
    q,
    m,
    tableRef,
    formRef,
    visible,
    refresh,
    success,
    fail,
    tip,
    handleNew,
    handleEdit,
    handleSearch,
    handleReset,
    onCancel,
    onOk,
    resetFields,
  };
}

export function useMiniList() {
  const q = ref({});
  const tableRef = ref();

  const refresh = () => {
    /// 这属于约定
    tableRef.value?.refresh();
  };

  const handleSearch = () => {
    refresh();
  };

  const handleReset = () => {
    q.value = {};
  };

  return {
    q,
    tableRef,
    handleSearch,
    handleReset,
  };
}
