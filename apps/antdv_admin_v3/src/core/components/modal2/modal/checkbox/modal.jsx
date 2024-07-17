import { computed, defineComponent, ref, toRaw, watch } from "vue";
import { Modal } from "ant-design-vue";
import SearchForm from "@/core/components/form/SearchForm";
import STable from "@/core/components/table/index";
import omit from "../../_util/omit";
import T from "../../_util/types";

const defaultTableProps = {
  size: "middle",
  selection: true,
};
const defaultModalProps = {
  destroyOnClose: true,
  wrapClassName: "x-modal-table-wrap",
};

const Props = Object.assign({}, Modal.props, {
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
    const selectedNum = ref(0);
    let selectedRows = [];
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
      selectedNum.value = rows.length;
      selectedRows = toRaw(rows);
    };

    const onClearSelected = () => {
      tableRef.value?.clearSelected(true);
    }

    const handleCancel = () => {
      emit("cancel");
    };
    const handleOk = () => {
      if (selectedRows.length) {
        emit("ok", selectedRows);
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
        onSelect: onSelect,
      };
      return inner;
    });

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

      const total = selectedNum.value;

      const form = (
        <SearchForm {...searchFormProps} onSearch={onSearch}></SearchForm>
      );

      const table = (
        <STable
          {...tableProps.value}
          ref={tableRef}
          v-slots={slots}
        ></STable>
      );

      const alert = (
        <div class="x-row x-modal-table-alert">
          <div class="full">
            <span>已选中：</span>
            <span class="red">{total}项</span>
            <a onClick={onClearSelected} v-show={total > 0}>
              清空选中
            </a>
          </div>
        </div>
      );

      return (
        <Modal {...modalProps} onCancel={handleCancel} onOk={handleOk}>
          {form}
          {alert}
          {table}
        </Modal>
      );
    };
  },
});

export default XModal;
