import {
  defineComponent,
  shallowReactive,
  ref,
  computed,
  withModifiers,
  onMounted,
  toRaw,
} from "vue";
import { Form } from "ant-design-vue";
import { T, classNames } from "../utils";

const Props = {
  size: T.string.def("default"),
  items: T.array.def([]),
  least: T.number.def(0),
  trigger: T.bool.def(false),
  fit: T.integer.def(0), // 一行放几项
  hideLabel: T.bool.def(false),
};

const SearchForm = defineComponent({
  name: "SearchForm",
  props: Props,
  emits: ["search"],
  setup(props, { emit, slots, attrs }) {
    const { items, least, size } = props;
    const addon = least && least < items.length;
    const m = shallowReactive({});

    const rules = computed(() => {
      const items = props.items;
      const rule = {};
      items.forEach((item) => {
        m[item.key] = item.value;
        if (item.required) {
          rule[item.key] = [{ required: true, trigger: "change", message: "" }];
        }
      });
      return rule;
    });

    /// item render
    const inputRender = (k, ps) => <a-input v-model:value={m[k]} {...ps} />;

    const datePickerRender = (k, ps) => (
      <a-date-picker v-model:value={m[k]} {...ps} />
    );

    const dictRender = (k, ps) => (
      <xd-select v-model:value={m[k]} {...ps}></xd-select>
    );

    const componentRender = (k, ps, Comp) => (
      <Comp v-model:value={m[k]} {...ps} />
    );

    const slotRender = (k) => <slot name={k} sf={m}></slot>;

    const renderMap = {
      input: inputRender,
      date: datePickerRender,
      dict: dictRender,
      comp: componentRender,
      slot: slotRender,
    };
    const children = computed(() => {
      const items = props.items;

      return items.map((item) => {
        const { label, key, type, props = {}, Comp } = item;
        props.size = size;
        const renderChild = renderMap[type];
        const child = renderChild ? renderChild(key, props, Comp) : null;
        return (
          <a-form-item label={label} name={key}>
            {child}
          </a-form-item>
        );
      });
    });

    const { resetFields, validate } = Form.useForm(m, rules);

    const onSearch = () => {
      validate()
        .then(() => {
          emit("search", toRaw(m));
        })
        .catch((e) => {});
    };

    const onReset = () => {
      items.forEach((item) => {
        m[item.key] = item.value;
      });
      resetFields();
    };

    const hide = ref(true);
    const showMore = () => {
      hide.value = !hide.value;
    };

    onMounted(() => {
      if (props.trigger) {
        const act = items.find((el) => el.required && !el.value);
        if (!act) {
          onSearch();
        }
      }
    });

    const wrapCls = computed(() => {
      const fit = props.fit;
      const cls = fit ? `form-${fit}col-wrap` : "x-search-wrap";
      return classNames([cls, "thin"], attrs.class);
    });

    return () => {
      return (
        <a-form
          model={m}
          rules={rules.value}
          autocomplete="off"
          class={wrapCls.value}
        >
          {children.value}

          <a-form-item>
            <a-button
              type="primary"
              size={size}
              style="margin-left: 12px"
              onClick={withModifiers(onSearch, ["prevent"])}
            >
              查询
            </a-button>
            <a-button
              size={size}
              style="margin-left: 12px"
              onClick={withModifiers(onReset, ["prevent"])}
            >
              重置
            </a-button>
            {addon ? (
              <a-button
                type="link"
                size={size}
                style="margin-left: 12px"
                onClick={showMore}
              >
                展开
              </a-button>
            ) : null}
          </a-form-item>
        </a-form>
      );
    };
  },
});

export default SearchForm;
