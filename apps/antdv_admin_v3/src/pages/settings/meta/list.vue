<template>
  <page>
    <a-form class="x-search-wrap">
      <a-form-item label="名称">
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
          </div>
        </template>
      </template>
    </x-table>

    <a-modal :title="m.action === 'new' ? '新增' : '编辑'" :width="520" :open="visible" @ok="onOk" @cancel="onCancel" :afterClose="resetFields">
      <a-form :model="m" ref="formRef" class="form-1col-wrap" style="padding: 0 15px">
        <a-form-item label="标识" name="key" :rules="{
          required: true,
          trigger: 'change',
          message: '请输入标识',
        }">
          <a-input v-model:value="m.key"></a-input>
        </a-form-item>
        <a-form-item label="名称" name="name" :rules="{
          required: true,
          trigger: 'change',
          message: '请输入名称',
        }">
          <a-input v-model:value="m.name"></a-input>
        </a-form-item>
        <a-form-item label="值" name="value" :rules="{
          required: true,
          trigger: 'change',
          message: '请输入值',
        }">
          <a-input v-model:value="m.value"></a-input>
        </a-form-item>
        <a-form-item label="备注" name="remark">
          <a-input v-model:value="m.remark"></a-input>
        </a-form-item>
      </a-form>
    </a-modal>
  </page>
</template>

<script setup>
import { search, save, del } from '@/api/base/meta'
import { usePage } from "@/pages/components/hooks/useListPage";

const columns = [
  {
    dataIndex: "rowNum",
  },
  {
    title: 'KEY',
    align: 'center',
    dataIndex: 'key'
  },
  {
    title: '名称',
    align: 'center',
    dataIndex: 'name'
  },
  {
    title: '值',
    align: 'center',
    dataIndex: 'value'
  },
  {
    title: '备注',
    align: 'center',
    dataIndex: 'remark'
  },
  {
    title: "操作",
    dataIndex: "operation",
    align: "right",
    // fixed: 'right',
  },
];

const saveForm = (data) => save(data);

// const rules = {};

const {
  q,
  m,
  visible,
  tableRef,
  formRef,
  handleSearch,
  handleReset,
  tip,
  handleNew,
  handleEdit,
  onOk,
  onCancel,
  resetFields
} = usePage(saveForm);

const loadData = (params) => {
  return search({ ...params, ...q.value });
};

const handleDelete = (r) => {
  del({ userId: r.userId }).then(tip);
};

</script>
