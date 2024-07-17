<template>
  <page>
    <div class="ptlt">
      <a-button type="primary" @click="handleSearch">刷新</a-button>
      <a-button type="primary" @click="handleNew" style="margin-left: 12px;">新增</a-button>
    </div>
    <x-table ref="tableRef" rowKey="id" :columns="columns" :load="loadData">
      <template #bodyCell="{ column, record }">
        <template v-if="column.dataIndex === 'operation'">
          <div class="tocw">
            <a-popconfirm title="确认删除" @confirm="handleDelete(record)">
              <a>删除</a>
            </a-popconfirm>
            <a @click="handleSetRoleMenu(record)">权限分配</a>
          </div>
        </template>
      </template>
    </x-table>

    <a-modal :title="m.action === 'new' ? '新增' : '编辑'" :width="520" :open="visible" @ok="onOk" @cancel="onCancel"
      :afterClose="resetFields">
      <a-form :model="m" ref="formRef" class="form-1col-wrap" style="padding: 0 15px">
        <a-form-item label="角色名" name="name" :rules="{
          required: true,
          trigger: 'change',
          message: '请输入角色名',
        }">
          <a-input v-model:value="m.name"></a-input>
        </a-form-item>
        <a-form-item label="备注" name="remark">
          <a-input v-model:value="m.remark"></a-input>
        </a-form-item>
      </a-form>
    </a-modal>
    <a-modal :title="'权限分配'" :width="520" :open="visibleMenu" @ok="onMenuOk" @cancel="onMenuCancel">
      <div style="max-height: 400px; overflow: auto">
        <a-tree v-model:checkedKeys="menuKeys" checkable checkStrictly :treeData="menuData"> </a-tree>
      </div>
    </a-modal>
  </page>
</template>

<script setup>
import {
  search,
  save,
  del,
} from "@/api/base/role";
import { usePage } from "@/pages/components/hooks/useListPage";
import { ref } from "vue";
import { search as menulist } from '@/api/base/menu'
import { convertTree } from '@/core/services/index'
const convert = (list) => convertTree(list, 0, 'id')

const columns = [
  {
    dataIndex: "rowNum",
  },
  {
    title: '角色名称',
    align: 'center',
    dataIndex: 'name',
  },
  {
    title: '备注',
    align: 'center',
    dataIndex: 'remark',
  },
  {
    title: "操作",
    dataIndex: "operation",
    align: "right",
    // fixed: 'right',
  },
];
// const rules = {};
const visibleMenu = ref(false);
const menuData = ref([])
const menuKeys = ref([])
const saveForm = (data) => save(data);
const {
  q,
  m,
  visible,
  tableRef,
  formRef,
  handleSearch,
  tip,
  handleNew,
  onOk,
  onCancel,
  resetFields
} = usePage(saveForm);

let cRow = null

const loadData = (params) => {
  return search({ ...params, ...q.value });
};

const handleDelete = (r) => {
  del({ id: r.id }).then(tip);
};

const handleSetRoleMenu = (row) => {
  cRow = row
  visibleMenu.value = true
  menuKeys.value = []
}

const onMenuOk = () => {
  let list = menuKeys.value

  if (list && list.checked) {
    list = list.checked
  }
  const data = list.map((key) => {
    return {
      id: cRow.id,
      menuId: key,
    }
  })
  save(data).then(tip)
  visibleMenu.value = false
}
const onMenuCancel = () => {
  visibleMenu.value = false
}

const getMenuData = () => {
  menulist().then((ret) => {
    const list = ret.data
      .map((el) => {
        el.title = el.name
        el.key = el.id
        return el
      })
    menuData.value = convert(list)
  })
}

getMenuData()

</script>
~@/core/services/index