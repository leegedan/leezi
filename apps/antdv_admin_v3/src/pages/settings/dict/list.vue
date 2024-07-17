<template>
  <page>
    <a-form class="x-search-wrap">
      <a-form-item label="key">
        <a-input v-model:value="q.key"></a-input>
      </a-form-item>
      <a-form-item label="名称">
        <a-input v-model:value="q.name"></a-input>
      </a-form-item>
      <a-form-item>
        <span>
          <a-button type="primary" @click="handleSearch">查询</a-button>
          <a-button style="margin-left: 8px" @click="handleReset"
            >重置</a-button
          >
        </span>
      </a-form-item>
    </a-form>
    <a-alert :show-icon="false" message="一些在服务端维护的键值数据" banner />
    <x-table ref="tableRef" rowKey="key" :columns="columns" :load="loadData">
    </x-table>
  </page>
</template>

<script setup>
import { search } from "@/api/base/dict";
import { useMiniList } from "@/pages/components/hooks/useListPage";

const columns = [
  {
    dataIndex: "rowNum",
  },
  {
    title: "KEY",
    align: "center",
    dataIndex: "key",
  },
  {
    title: "名称",
    align: "center",
    dataIndex: "name",
  },
  {
    title: "值",
    align: "center",
    dataIndex: "options",
    fmt: { type: "array" },
  },
  {
    title: "备注",
    align: "center",
    dataIndex: "remark",
  },
];

const { q, tableRef, handleSearch, handleReset } = useMiniList();

const loadData = (params) => {
  return search({ ...params, ...q.value });
};
</script>
