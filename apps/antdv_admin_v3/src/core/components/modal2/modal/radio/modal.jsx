import { computed, defineComponent, ref, toRaw, watch } from "vue";
import { Modal } from "ant-design-vue";
import SearchForm from "@/core/components/form/SearchForm";
import STable from "@/core/components/table/index";
import omit from "../../_util/omit";
import T from "../../_util/types";

const defaultTableProps = {
  size: "middle",
  // bordered: true,
  // scroll: { y: 320 },
  // pageNum: 1,
  // size: 'small'
};
const defaultModalProps = {
  destroyOnClose: true,
  wrapClassName: "x-modal-table-wrap",
};

const Props = Object.assign({}, Modal.props, {
  // {
  //   fields: [],
  //   columns: [],
  //   rowKey: 'serialNo',
  //   selectedRowKeys: [],
  //   autoLoad: true,
  //   pageSize: 5,
  // }
  conf: T.object.isRequired,
  loadData: T.func.isRequired,
  params: T.object.def({}),
});

const XModal = defineComponent({
  props: Props,
  emits: ["ok", "cancel"],
  setup(props, { slots, emit }) {
    const { loadData } = props;
    const tableRef = ref(null);
    const selectedRowKeys = ref([]);
    let selectedRow = null;
    let filters = {};

    const loadTableData = (params) => {
      return loadData({
        ...params,
        ...filters,
      });
    };

    const onSearch = (params) => {
      filters = {
        ...props.params,
        ...params,
      };
      tableRef.value?.refresh(true);
    };

    const onSelect = (keys, rows) => {
      selectedRowKeys.value = keys;
      selectedRow = toRaw(rows[0]);
    };

    const handleCancel = () => {
      emit("cancel");
    };
    const handleOk = () => {
      if (selectedRow) {
        emit("ok", selectedRow);
      } else {
        emit("cancel");
      }
    };

    const tableProps = computed(() => {
      const conf = props.conf;
      const rowKey = conf.rowKey || "id";

      const inner = {
        ...defaultTableProps,
        rowKey,
        pageSize: conf.pageSize || 5,
        columns: conf.columns || [],
        autoload: false,
        load: loadTableData,
        customRow: (row) => {
          return {
            onClick: (e) => {
              onSelect([row[rowKey]], [row]);
            },
          };
        },
      };
      return inner;
    });

    const rowSelection = computed(() => {
      return {
        type: "radio",
        selectedRowKeys: selectedRowKeys.value,
        onChange: onSelect,
      };
    });

    // watch(() => props.selectedRowKeys, (keys) => {
    //   if (keys?.length) {
    //     selectedRowKeys.value = keys
    //   }
    // }, {
    //   immediate: true
    // })

    return () => {
      const { filters = [], hideLabel = false, fit = 2 } = props.conf;
      const searchFormProps = {
        items: filters,
        fit,
        hideLabel,
        trigger: true,
        // size: 'small'
      };

      const modalProps = Object.assign(
        {},
        defaultModalProps,
        omit(props, ["conf", "loadData", "params", "onOk", "onCancel"])
      );

      const form = (
        <SearchForm {...searchFormProps} onSearch={onSearch}></SearchForm>
      );

      const table = (
        <STable
          {...tableProps.value}
          rowSelection={rowSelection.value}
          ref={tableRef}
          v-slots={slots}
        ></STable>
      );

      return (
        <Modal {...modalProps} onCancel={handleCancel} onOk={handleOk}>
          {form}
          {table}
        </Modal>
      );
    };
  },
});

export default XModal;
