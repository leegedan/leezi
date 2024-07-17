<template>
  <page>
    <div class="ptlt">
      <a-button type="primary" @click="handleSearch">刷新</a-button>
      <a-button type="primary" @click="handleNew" style="margin-left: 12px">新增一级菜单</a-button>
    </div>
    <x-table ref="tableRef" rowKey="id" :columns="columns" :load="loadData" :pageSize="1000" :expandedRowKeys.sync="keys"
      :showPagination="false" @expand="onExpanded">
      <template #bodyCell="{ column, record }">
        <template v-if="column.dataIndex === 'isMenu'">
          <span v-if="record.isMenu" style="color: green">菜单</span>
          <span v-else style="color: red">控制权限</span>
        </template>
        <template v-else-if="column.dataIndex === 'operation'">
          <div class="tocw">
            <a-popconfirm title="确认删除" @confirm="handleDelete(record)">
              <a>删除</a>
            </a-popconfirm>
            <a @click="handleAddCtrl(record)">权限分配</a>
            <a @click="handleAdd(record)" v-if="record.isMenu" v-action:add>添加子菜单</a>
          </div>
        </template>
      </template>
    </x-table>

    <a-modal :title="m.action === 'new'
        ? '新增一级菜单'
        : m.action === 'add'
          ? '新增子菜单'
          : '编辑菜单'
      " :width="520" :open="visible" @ok="onOk" @cancel="onCancel" :afterClose="resetFields">
      <a-form :model="m" ref="formRef" class="form-1col-wrap" style="padding: 0 15px">
        <a-form-item label="上级菜单" name="parentName" v-if="m.action === 'add'">
          <a-input v-model:value="m.parentName" disabled></a-input>
        </a-form-item>
        <a-form-item :label="m.isMenu ? '菜单名称' : '权限名称'" name="name"
          :rules="{ required: true, trigger: 'change', message: '请输入名称' }">
          <a-input v-model:value="m.name"></a-input>
        </a-form-item>
        <a-form-item :label="m.isMenu ? '菜单路径' : '权限KEY'" name="path"
          :rules="{ required: true, trigger: 'change', message: '请输入标识' }">
          <a-input v-model:value="m.path"></a-input>
        </a-form-item>
        <a-form-item label="备注">
          <a-input v-model:value="m.menuDesc"></a-input>
        </a-form-item>
      </a-form>
    </a-modal>
    <a-modal :title="'控制权限设置'" :width="520" :open="visibleCtrl" @ok="onSetOk" @cancel="onSetCancel">
      <a-form ref="refFormc" :model="mc" class="form-1col-wrap">
        <a-form-item label="菜单名称">
          <a-input v-model:value="mc.menu" disabled></a-input>
        </a-form-item>
        <a-form-item label="权限设置">
          <a-radio-group v-model:value="mc.type" :options="[
            { label: '常用按钮权限', value: 1 },
            { label: '自定义按钮权限', value: 2 },
          ]" />
        </a-form-item>
        <a-form-item label="常用权限" v-if="mc.type === 1">
          <a-checkbox-group v-model:value="mc.fast" :options="options" />
        </a-form-item>
        <a-form-item label="权限名称" name="name" :rules="{ required: true, trigger: 'change', message: '请输入名称' }"
          v-if="mc.type === 2">
          <a-input v-model="mc.name"></a-input>
        </a-form-item>
        <a-form-item label="权限KEY" name="path" :rules="{
          required: true,
          trigger: 'change',
          message: '请输入路径/权限名',
        }" v-if="mc.type === 2">
          <a-input v-model:value="mc.path"></a-input>
        </a-form-item>

        <a-form-item label="备注" v-if="mc.type === 2">
          <a-input v-model:value="mc.menuDesc"></a-input>
        </a-form-item>
      </a-form>
    </a-modal>
  </page>
</template>

<script setup>
import { save, del, search } from "@/api/base/menu";
import { usePage } from "@/pages/components/hooks/useListPage";
import { ref } from "vue";
import { convertTree } from "@/core/services/index";
const convert = (list) => convertTree(list, 0, "id");

const options = [
  { value: "add", label: "新增" },
  { value: "edit", label: "修改" },
  { value: "delete", label: "删除" },
  // { value: 'query', label: '查询' },
  // { value: 'get', label: '详情' },
  { value: "setting", label: "设置", disabled: true },
  { value: "enable", label: "启用", disabled: true },
  { value: "disable", label: "禁用", disabled: true },
  { value: "import", label: "导入", disabled: true },
  { value: "export", label: "导出", disabled: true },
];

const columns = [
  {
    title: "名称",
    dataIndex: "name",
  },
  // {
  //   title: '上级菜单',
  //   width: 120,
  //   dataIndex: 'parentId'
  //   // fmt: { type: 'dict', key: 'DEPT' }
  // },
  {
    title: "类型",
    dataIndex: "isMenu",
  },
  {
    title: "路径/权限名",
    dataIndex: "path",
  },
  {
    title: "备注",
    dataIndex: "menuDesc",
  },
  {
    title: "操作",
    dataIndex: "operation",
    align: "right",
    // fixed: 'right',
  },
];
// const rules = {};
const visibleCtrl = ref(false);
const menuKeys = ref([]);
const keys = ref([]);
const refFormc = ref();
const mc = ref({ type: 1, fast: [] });
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
  onOk,
  onCancel,
  resetFields,
} = usePage(saveForm);

let cRow = null;

const loadData = (params) => {
  // return search({ ...params, ...q.value });
  return search({}).then((ret) => {
    ret.data = convert(ret.data);
    return ret;
  });
};

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

const onSetOk = () => {
  const data = mc.value
  save(data).then(tip);
  visibleCtrl.value = false;
};
const onSetCancel = () => {
  visibleCtrl.value = false;
};

const handleNew = () => {
  m.value = {
    parentId: 0,
    menuDesc: '',
    status: 'VALID',
    isMenu: true,
    action: 'new',
  }
  visible.value = true
}
const handleAdd = (r) => {
  m.value = {
    parentId: r.id,
    parentName: r.name,
    menuDesc: '',
    isMenu: true,
    action: 'add',
  }
  visible.value = true
}
const handleAddCtrl = (r) => {
  mc.value = {
    type: 1,
    fast: ['add', 'edit', 'delete'], // 默认
    parentId: r.id,
    menu: r.name,
    name: '',
    path: '',
    menuDesc: ''
  }
  visibleCtrl.value = true
}
</script>
~@/core/services/index