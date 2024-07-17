<template>
  <page>
    <a-form class="x-search-wrap">
      <a-form-item label="用户名称">
        <a-input v-model:value="q.name"></a-input>
      </a-form-item>
      <a-form-item>
        <span>
          <a-button type="primary" @click="handleSearch">查询</a-button>
          <a-button style="margin-left: 8px" @click="handleReset">重置</a-button>
        </span>
      </a-form-item>
    </a-form>
    <div class="ptlt">
      <a-button type="primary" @click="handleNew" v-action:add>新增</a-button>
    </div>
    <x-table ref="tableRef" rowKey="id" :columns="columns" :load="loadData">
      <template #bodyCell="{ column, record }">
        <template v-if="column.dataIndex === 'operation'">
          <div class="tocw">
            <a-popconfirm title="确认删除" @confirm="handleDelete(record)">
              <a v-action:delete>删除</a>
            </a-popconfirm>
            <a @click="handleEdit(record)" v-action:edit>修改</a>
            <a @click="handleResetPwd(record)" v-action:edit>重置密码</a>
          </div>
        </template>
      </template>
    </x-table>

    <a-modal :title="m.action === 'new' ? '新增帐号' : '编辑帐号'" :width="520" :open="visible" @ok="onOk" @cancel="onCancel" :afterClose="resetFields">
      <a-form :model="m" ref="formRef" class="form-1col-wrap" style="padding: 0 15px">
        <a-form-item label="用户名" name="userName" :rules="{
          required: true,
          trigger: 'change',
          message: '请输入用户名',
        }">
          <a-input v-model:value="m.userName"></a-input>
        </a-form-item>
        <a-form-item label="密码" name="password" :rules="{ required: true, trigger: 'change', message: '请输入密码' }"
          v-if="m.action === 'new'">
          <a-input-password v-model:value="m.password"></a-input-password>
        </a-form-item>
        <a-form-item label="角色" name="roles" :rules="{ required: true, trigger: 'change', message: '请选择角色' }">
          <d-select v-model:value="m.roles" dk="ROLE" async mode="multiple" />
        </a-form-item>
        <a-form-item label="绑定员工">
          <d-select v-model:value="m.staffId" dk="STAFF" async />
        </a-form-item>
      </a-form>
    </a-modal>
    <reset-password v-model:visible="visibleReset" @reset="onResetPassword"></reset-password>
  </page>
</template>

<script setup>
import {
  search as searchUser,
  save as saveUser,
  del as deleteUser,
} from "@/api/base/user";
import ResetPassword from "@/pages/components/ResetPassword.vue";
import { usePage } from "@/pages/components/hooks/useListPage";
import { ref } from "vue";
// import md5 from 'md5'

const columns = [
  {
    dataIndex: "rowNum",
  },
  {
    title: "用户名称",
    dataIndex: "userName",
  },
  {
    title: "角色",
    dataIndex: "roleId",
    fmt: { type: "dict", key: "ROLE", async: true },
  },
  {
    title: "绑定员工",
    dataIndex: "staffName",
  },
  {
    title: "操作",
    dataIndex: "operation",
    align: "right",
    // fixed: 'right',
  },
];

const saveForm = (data) => saveUser(data);

// const rules = {};

const visibleReset = ref(false);

const {
  q,
  m,
  visible,
  tableRef,
  formRef,
  handleSearch,
  handleReset,
  success,
  tip,
  handleNew,
  handleEdit,
  onOk,
  onCancel,
  resetFields
} = usePage(saveForm);

const loadData = (params) => {
  return searchUser({ ...params, ...q.value });
};

const handleDelete = (r) => {
  deleteUser({ userId: r.userId }).then(tip);
};

const handleResetPwd = (r) => {
  // m = { ...r };
  visibleReset.value = true;
};

const onResetPassword = (password) => {
  saveUser({
    password,
    userId: m.userId,
  }).then((x) => success(false));
};
</script>
