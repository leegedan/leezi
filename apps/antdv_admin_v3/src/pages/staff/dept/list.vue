<template>
  <page>
    <div class="ptlt">
      <a-button type="primary" @click="handleSearch">刷新</a-button>
      <a-button type="primary" @click="handleNew" style="margin-left: 12px">新增一级部门</a-button>
    </div>
    <x-table ref="tableRef" rowKey="id" :columns="columns" :load="loadData" :pageSize="1000" :expandedRowKeys.sync="keys"
      :showPagination="false" @expand="onExpanded">
      <template #bodyCell="{ column, record }">
        <template v-if="column.dataIndex === 'operation'">
          <div class="tocw">
            <a-popconfirm title="确认删除" @confirm="handleDelete(record)">
              <a>删除</a>
            </a-popconfirm>
            <a @click="handleEdit(record)">修改</a>
            <a @click="handleAdd(record)">添加子部门</a>
          </div>
        </template>
      </template>
    </x-table>

    <a-modal :title="m.action === 'new'
      ? '新增一级部门'
      : m.action === 'add'
        ? '新增子级部门'
        : '编辑部门'
      " :width="520" :open="visible" @ok="onOk" @cancel="onCancel" :afterClose="resetFields">
      <a-form :model="m" ref="formRef" class="form-1col-wrap">
        <a-form-item label="上级部门" name="parentName" v-if="m.action === 'add'">
          <a-input v-model:value="m.parentName" disabled></a-input>
        </a-form-item>
        <a-form-item label="部门名称" name="name" :rules="{ required: true, trigger: 'change', message: '请输入名称' }">
          <a-input v-model:value="m.name"></a-input>
        </a-form-item>
        <a-form-item label="负责人">
          <d-select v-model:value="m.owners" dk="STAFF" async></d-select>
        </a-form-item>
      </a-form>
    </a-modal>
  </page>
</template>

<script setup>
import { save, del } from "@/api/staff/dept";
import { usePage } from "@/pages/components/hooks/useListPage";
import { ref } from "vue";
import { toBeTree, fwSpace } from "@/core/services/index";
const convert = (list) => toBeTree(list, 0, "id");


const columns = [
  {
    title: '部门名称',
    dataIndex: 'name'
  },
  {
    title: '上级部门',
    dataIndex: 'parentId',
    fmt: { type: 'dict', key: 'DEPT', async: true }
  },
  {
    title: '负责人',
    dataIndex: 'manager'
  },
  {
    title: "操作",
    dataIndex: "operation",
    align: "right",
    // fixed: 'right',
  },
];
// const rules = {};
const keys = ref([]);
const saveForm = (data) => save(data);
const {
  // q,
  m,
  visible,
  tableRef,
  formRef,
  handleSearch,
  tip,
  // handleNew,
  handleEdit,
  onOk,
  onCancel,
  resetFields,
} = usePage(saveForm);

let cRow = null;

const loadData = (params) => {
  // fwSpace.refresh('DEPT')
  return fwSpace.get('DEPT', true)
    .then(convert)
    .then(data => {
      keys.value = setKeys(data)
      return { data }
    })
};

const setKeys = (data) => {
  return data.map(el => el.id)
}

const onExpanded = (expanded, row) => {
  if (expanded) {
    keys.value.push(row.id);
  } else {
    keys.value = keys.value.filter((key) => key !== row.id);
  }
};

const handleDelete = (r) => {
  del({ id: r.id }).then(tip);
};

const handleNew = () => {
  m.value = {
    parentId: 0,
    status: 'NEW',
    action: 'new',
  }
  visible.value = true
}
const handleAdd = (r) => {
  m.value = {
    parentId: r.id,
    parentName: r.name,
    status: 'NEW',
    action: 'add',
  }
  visible.value = true
}
</script>
