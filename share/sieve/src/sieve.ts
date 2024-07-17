import Receiver, { Evt } from "./receiver";
import Reporter from "./reporter";

import type { Storage } from "./reporter";
export type { Evt } from "./receiver";

const fakeup = (e) => {
  console.warn("sieve upload");
  console.info(e);
};

const sieveUp = (url) => {
  return (data) => {
    return fetch(url, {
      method: "POST",
      body: JSON.stringify(data),
      keepalive: true,
    });
  };
};

const getUp = (up) => {
  if (typeof up === "string" && up.indexOf("http") === 0) {
    return sieveUp(up);
  } else {
    return fakeup;
  }
};

const isFunction = (fn) => typeof fn === "function";

export type Conf = {
  upload?: Function | string;
  timespan?: number;
  limit?: number;
  storage?: Storage;
};

class Sieve {
  config: Conf;
  reporter: Reporter;
  receiver: Receiver;
  destoryTaskQuque: Array<Function>;

  constructor(config: Conf) {
    const upload = isFunction(config.upload)
      ? config.upload
      : getUp(config.upload);

    const conf = Object.assign(
      { storage: window.localStorage },
      config
    );

    const reporter = new Reporter({
      upload: upload,
      storage: conf.storage,
      limit: conf.limit,
      timespan: conf.timespan,
    });

    const receiver = new Receiver((e) => {
      reporter.receive(e);
    });

    this.config = conf;
    this.reporter = reporter;
    this.receiver = receiver;
    this.destoryTaskQuque = [];
  }
  // 发送信标
  emit(e: Evt) {
    this.receiver.receive(e);
  }
  // 销毁时候需要执行的回调函数
  over(fn) {
    if (isFunction(fn)) {
      this.destoryTaskQuque.push(fn);
    }
  }
  // 处理信标
  handle(fn) {
    if (isFunction(fn)) {
      this.receiver.use(fn);
    }
  }
  // 附着数据
  attach(fn, every) {
    if (isFunction(fn)) {
      this.reporter.use(fn, every);
    }
  }
  // 适用场景
  use(fn) {
    const { emit, attach, handle, over } = this;
    if (isFunction(fn)) {
      fn({ emit, attach, handle, over });
    }
    return this;
  }
  // 销毁
  destory() {
    this.reporter.destory();
    this.receiver.destory();

    this.destoryTaskQuque.forEach((over) => {
      over.call(null, this.config);
    });
  }
}

export default Sieve;
