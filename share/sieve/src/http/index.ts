export function CatchXhrSend(options) {
  return ({ emit, over }) => {
    var open = window.XMLHttpRequest.prototype.open;

    var proxy = function (method, url) {
      emit({
        type: "http",
        payload: {
          method,
          url,
        },
      });
      open(method, url);
    };

    window.XMLHttpRequest.prototype.open = proxy;

    over(function () {
      window.XMLHttpRequest.prototype.open = open;
    });
  };
}
