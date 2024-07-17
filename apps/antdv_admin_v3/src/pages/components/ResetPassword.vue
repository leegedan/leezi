<template>
  <a-modal :open="props.visible" :width="360" :title="null" :footer="null" @cancel="onCancel" @ok="onOk">
    <div>
      <div>
        <ExclamationCircleFilled style="color: #faad14" />
        <span style="font-size: 14px; color: rgba(0, 0, 0, 0.65)"> 重置密码后，原密码将无法登录！</span>
      </div>
      <div style="margin-top: 16px">
        <Input.Password v-model:value.trim="password" :visible="true" placeholder="请输入新密码">
        </Input.Password>
      </div>
    </div>
    <div style="margin-top: 16px;text-align: right;">
      <a-button type="primary" @click="onOk">确定</a-button>
    </div>
  </a-modal>
</template>

<script setup>
import { Input } from "ant-design-vue";
import { ref } from "vue";

const props = defineProps({
  visible: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["update:visible", "reset"]);

const password = ref("88888888");

// const visiblePwd = ref(true);

const onCancel = () => {
  emit("update:visible", false);
};
const onOk = () => {
  if (password.value) {
    emit("reset", password.value);
  }
  onCancel();
};
</script>
