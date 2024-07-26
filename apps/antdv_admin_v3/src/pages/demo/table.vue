<template>
  <div>
    <!-- <C1 :level="'1'" name="h111">
      111
    </C1>
    <C2 :level="'2'" name="p222">
      <span>222</span>
      <template #ttt="tt">
        <h1>{{ tt }}</h1>
      </template>
    </C2>

    <C3 :level="'3'" name="p3333">
      333
    </C3>
    <C3 :level="'3'" name="p3333">
      <span name="sp333">333</span>
    </C3> -->

    <a-card>
      <a-form class="x-search-wrap thin">
        <a-form-item label="用户名">
          <a-input v-model:value="m.username" />
        </a-form-item>
<!-- 
        <a-form-item label="日期">
          <XRangePicker v-model:value="m.begin" :model="m"></XRangePicker>
        </a-form-item>

        <a-form-item label="启用">
          <XCheckbox v-model:value="m.status" on="66"></XCheckbox>
        </a-form-item>
        <a-form-item label="启用2">
          <NInput v-model:value="m.nn"></NInput>
        </a-form-item> -->
        <a-form-item label="用户名">
          <!-- <SelectStaff2 v-model:visible="visible" @change="onTest1">
            <a-button @click="onTest2">TT</a-button>
          </SelectStaff2> -->
        </a-form-item>

        <a-form-item label="">
          <a-button @click="onTest">查询</a-button>
        </a-form-item>
      </a-form>

      <x-table rowKey="id" :columns="columns" :load="loadData">
        <template #bodyCell="{ column, value }">
          <template v-if="column.key === 'operation'"><a>action</a></template>
          <template v-else-if="column.dataIndex === 'avatar'">
            <a-avatar :src="value" />
          </template>
        </template>
      </x-table>
    </a-card>
  </div>
</template>

<script setup>
import { reactive, toRaw, toRef } from 'vue';
import SearchForm from '@/core/components/form/SearchForm'
import { search as getList } from '@/api/staff/staff'
import { Modal } from 'ant-design-vue';
import SelectStaff from '@/core/services/components/modal/SelectStaffModal'
import SelectStaff1 from '@/core/services/components/modal/MultiSelectStaffModal'
// import SelectStaff2 from '@/core/services/components/modal/SlotStaffModal'
import NKP from './kp'
import {
  C1,
  C2,
  C3
} from './test'

const columns = [
  {
    dataIndex: 'rowNum'
  },
  {
    title: '头像',
    dataIndex: 'avatar',
    align: 'center',
    customCell: (r, i) => ({
      style: { padding: '2px 0' }
    }),
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
    fmt: { type: 'dict', key: 'DEPT' }
  },
  {
    title: '年龄',
    dataIndex: 'age'
  },
  {
    title: '薪资',
    dataIndex: 'salary',
    fmt: { type: 'cny', key: '¥' },
    customCell: () => ({
      style: { textAlign: 'right' }
    }),
  },
  {
    title: '状态',
    dataIndex: 'status',
    fmt: { type: 'dict', key: 'YGZT' }
  },

  {
    title: '侧写',
    dataIndex: 'desc',
    fmt: { type: 'dict', key: 'RWCX', async: true }
  },

  {
    title: '入职日期',
    dataIndex: 'join'
    // fmt: { type: 'date', key: 'YYYY-MM-DD' }
  },
  {
    title: '操作',
    key: 'operation',
    align: 'right',
    fixed: 'right',
    width: '140px',
  }
]

const m = reactive({
  // begin: '2012-01-01',
  //   end: '2012-02-11'
})
const refm = toRef(m)
const visible = toRef(false)

// const cols = reactive(columns)

const loadData = (parm) => {
  const data = { ...parm }
  return getList(data)
}

const onSearch = (data) => {
  console.log(data)
}

setTimeout(() => {

  m.end = '2012-02-11'
  m.begin = '2012-01-01'
  // refm.value = {
  //   begin: '2012-01-01',
  //   end: '2012-02-11'
  // }
}, 3000)
const onTest = () => {
  const data = toRaw(m)
  console.log(data)
}

const onTest1 = (e, x) => {
  console.log(e)
  console.log(x)
}


const onTest2 = (e) => {
  visible.value = true
}
</script>