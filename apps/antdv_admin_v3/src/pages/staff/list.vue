<template>
  <page>
    <a-form class="x-search-wrap thin">
      <a-form-item label="姓名">
        <a-input v-model:value="q.name"></a-input>
      </a-form-item>
      <a-form-item label="部门">
        <DeptTree v-model:value="q.deptId"></DeptTree>
      </a-form-item>
      <a-form-item label="创建时间">
        <x-range-picker v-model:value="q.startTime" :model="q" begin="startTime" end="endTime"></x-range-picker>
      </a-form-item>
      <a-form-item>
        <span>
          <a-button type="primary"  style="margin: 0 12px"  @click="handleSearch">查询</a-button>
          <a-button @click="handleReset">重置</a-button>
        </span>
      </a-form-item>
    </a-form>
    <div class="ptlt">
      <a-button type="primary" @click="handleNew" v-action:add>新增</a-button>
    </div>
    <x-table ref="tableRef" rowKey="id" :columns="columns" :load="loadData">
      <template #bodyCell="{ column, record, value }">
        <template v-if="column.dataIndex === 'operation'">
          <div class="tocw">
            <a-popconfirm title="确认删除" @confirm="handleDelete(record)">
              <a>删除</a>
            </a-popconfirm>
            <a @click="handleEdit(record)">修改</a>
          </div>
        </template>
        <template v-else-if="column.dataIndex === 'avatar'">
          <a-avatar :src="value" />
        </template>
      </template>
    </x-table>

    <a-modal :title="m.action === 'new' ? '新增员工' : '编辑员工'" :width="720" :open="visible" @ok="onOk" @cancel="onCancel" :afterClose="resetFields">
      <a-form ref="formRef" :model="m" class="form-2col-wrap" style="padding: 0 15px">
        <a-form-item label="姓名" name="name">
          <a-input v-model:value="m.name"></a-input>
        </a-form-item>
        <a-form-item label="电话" name="phone">
          <a-input v-model:value="m.phone"></a-input>
        </a-form-item>
        <a-form-item label="部门" name="deptId" :rules="{ required: true, trigger: 'change', message: '请输入归属部门' }">
          <DeptTree v-model:value="m.deptId"></DeptTree>
        </a-form-item>
        <a-form-item label="状态">
          <d-select v-model:value="m.status" dk="YGZT" />
        </a-form-item>
        <!-- <a-form-item label="岗位">
          <a-input v-model:value="m.jobTitle"></a-input>
        </a-form-item> -->
        <a-form-item label="薪资" name="salary">
          <n-input v-model:value="m.salary" />
        </a-form-item>
        <a-form-item label="侧写">
          <d-select v-model:value="m.desc" dk="RWCX" async />
        </a-form-item>
        <a-form-item label="备注" class="full">
          <a-textarea v-model:value="m.remark" :auto-size="{ minRows: 2, maxRows: 3 }" />
        </a-form-item>
      </a-form>
    </a-modal>
  </page>
</template>
<script setup>
import { search, save, del } from '@/api/staff/staff'
import DeptTree from '@/core/services/components/tree/DeptTree'
import { usePage } from "@/pages/components/hooks/useListPage";
import { ref } from "vue";

const columns = [
  {
    dataIndex: 'rowNum'
  },
  {
    title: '头像',
    dataIndex: 'avatar',
    align: 'center',
  },
  {
    title: '姓名',
    dataIndex: 'name'
  },
  {
    title: '联系方式',
    dataIndex: 'phone'
  },
  {
    title: '部门',
    dataIndex: 'deptId',
    fmt: { type: 'dict', dk: 'DEPT', ns: 'FW' }
  },
  {
    title: '年龄',
    dataIndex: 'age'
  },
  {
    title: '薪资',
    dataIndex: 'salary',
    fmt: { type: 'cny', fmt: '¥' }
  },
  {
    title: '状态',
    dataIndex: 'status',
    fmt: { type: 'dict', key: 'YGZT' }
  },

  {
    title: '侧写',
    dataIndex: 'desc',
    fmt: { type: 'dict', dk: 'RWCX', ns: 'ZD' }
  },

  {
    title: '入职日期',
    dataIndex: 'join'
    // fmt: { type: 'date', key: 'YYYY-MM-DD' }
  },
  {
    title: '操作',
    dataIndex: 'operation',
    align: 'right',
    fixed: 'right',
    width: '140px',
  }
]

// const rules = {};
const saveForm = (data) => save(data);

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
  return search({ ...params, ...q.value });
};

const handleDelete = (r) => {
  del({ userId: r.userId }).then(tip);
};
</script>
