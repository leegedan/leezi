import { defineComponent, defineProps, ref, toRaw, unref } from "vue";
import { Select } from "ant-design-vue";
import {T, copy, omit} from "../utils";

const Props = copy(Select.props, {
  load: T.func.isRequired,
  search: T.bool.def(true),
  textKey: T.string,

  /// 添加一个绑定属性
  model: T.object.def({}),
});

const AsyncSelect = defineComponent({
  name: "AsyncSelect",
  props: Props,
  emits: ["change"],
  setup(props, { emit, slots }) {
    const { load, search, value, textKey, placeholder = "请选择" } = props;
    const model = toRaw(props.model);
    const loading = ref(false);
    const options = ref([]);
    const localSearch = ref(false);

    let list = [];
    let curOpts = [];
    let pageNo = 0;
    const pageSize = 7;
    let max = 0;

    const loadData = () => {
      loading.value = true;
      load().then((data) => {
        loading.value = false;
        list = data;
        if (search === false) {
          options.value = data;
        } else {
          const len = data.length;
          if (len <= 10) {
            options.value = data;
          } else {
            localSearch.value = true;
            if (value) {
              const i = list.findIndex((el) => el.value === value);
              if (i > 0) {
                const temp = list[i];
                list[i] = list[0];
                list[0] = temp;
              }
            }

            max = ((len / pageSize) >>> 0) + (len % pageSize ? 1 : 0);
            pageNo = -1;
            handleNext();
          }
        }
      });
    };

    const handleNext = () => {
      pageNo += 1;
      if (pageNo === max) {
        pageNo = 0;
      }
      const begin = pageNo * pageSize;
      curOpts = list.slice(begin, begin + pageSize);
      options.value = curOpts;
    };

    const handleFocus = () => {
      if (localSearch) {
        options.value = curOpts;
      }
    };

    const handleChange = (value) => {
      const multiple = Array.isArray(value);
      const data = multiple
        ? value.map((v) => list.find((el) => el.value === v))
        : list.find((el) => el.value === value);

      if (textKey) {
        model[textKey] = multiple ? data.map((el) => el.label) : data.label;
      }
      emit("change", value, data);
    };

    const handleSearch = (value) => {
      if (value === "") {
        /// trim()
        options.value = curOpts;
        return;
      }
      let data = list.filter((el) => {
        return el.label.indexOf(value) >= 0;
      });
      options.value = data;
    };

    loadData();

    return () => {
      const rest = omit(props, [
        "load",
        "search",
        "model",
        "textKey",
        "loading",
        "placeholder",
        "onChange",
      ]);

      const selectProps = {
        ...rest,
        placeholder,
        loading: loading.value,
        onChange,
      };

      if (localSearch.value) {
        selectProps["showSearch"] = true;
        selectProps["filterOption"] = false;
        selectProps["placeholder"] = "关键字检索";
        selectProps["onSearch"] = handleSearch;
        selectProps["onFocus"] = handleFocus;
      }

      return (
        <a-select
          {...selectProps}
          onChange={handleChange}
          v-slots={slots}
        ></a-select>
      );
    };
  },
});

export default AsyncSelect;
