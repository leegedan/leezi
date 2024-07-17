function on(target, type, handler) {
  target.addEventListener(type, handler, false);
}

function off(target, type, handle) {
  target.removeEventListener(type, handle);
}

const attrKey = "data-sieve";
const attrParamKey = "data-sieve-param";

export function CatchClick(ele) {
  return ({emit, over}) => {
    const handle = (e) => {
      var $el = e.target || e.srcElement;

      const sieveTag = $el.getAttribute(attrKey);
      let data = {}
      if (sieveTag) {
        const params = $el.getAttribute(attrParamKey);
        data = params && JSON.parse(params) || {}
      }

      emit({
        type: "click",
        payload: {
          tag: sieveTag,
          ...data
        },
        target: $el
      });
    };

    on(ele, 'click', handle)

    over(function() {
        off(ele, 'click', handle)
    })
  };
}
