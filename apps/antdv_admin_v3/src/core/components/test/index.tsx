import { defineComponent } from "vue";

export function useSize(size, setSize) {
  return defineComponent({
    setup() {
      const items = [
        { key: "large", label: "宽松" },
        { key: "middle", label: "默认" },
        { key: "small", label: "紧凑" },
      ];
      return () => (
        <button
          onClick={() => {
            setSize("size btn1");
          }}
        >
          {size.value}
        </button>
      );
    },
  });
}

export function useSize2(size, setSize) {
  const items = [
    { key: "large", label: "宽松" },
    { key: "middle", label: "默认" },
    { key: "small", label: "紧凑" },
  ];
  return (
    <button
      onClick={() => {
        setSize("size btn2");
      }}
    >
      size btn2
    </button>
  );
}

export function useSize3(size, setSize) {
  const items = [
    { key: "large", label: "宽松" },
    { key: "middle", label: "默认" },
    { key: "small", label: "紧凑" },
  ];
  return (props) => (
    <button
      onClick={() => {
        setSize("size btn3");
      }}
    >
      {props.title}
      size btn3
    </button>
  );
}
