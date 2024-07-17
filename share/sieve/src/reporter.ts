const storageKey = "_sieve_data";

export type Storage = {
  getItem: (k: string) => any;
  setItem: (k: string, v: any) => void;
}

class Reporter {
  middleware: Array<Function>;
  onceMiddleware: Array<Function>;
  upload: Function;
  storage: Storage;
  timespan: number;
  timer: number;
  limit: number;
  stack: Array<Record<string, any>>;
  gdata: Record<string, any>;

  constructor({ upload, storage, timespan = -1, limit = 10 }) {
    this.upload = upload;
    this.storage = storage;

    this.timespan = timespan;
    this.limit = limit;

    this.gdata = {};
    this.stack = [];
    this.middleware = [];
    this.onceMiddleware = [];

    this.startup();
  }

  startup() {
    const data = JSON.parse(this.storage.getItem(storageKey));

    if (this.timespan === -1) {
      // 卸载事件发送
      window.addEventListener("beforeunload", () => {
        this.upload(this.stack);
      });
    } else {
      window.addEventListener("beforeunload", () => {
        this.persist();
      });
    }

    if (data.length) {
      this.stack = data;
      if (this.timespan !== -1) {
        // 心跳发送
        this.uploadData();
        this.work();
      }
    }
  }

  /**
   *
   * @param {*} fn
   * @param {*} every
   */
  use(fn: Function, every = false) {
    if (every) {
      this.middleware.push(fn);
    } else {
      // 必须提交的参数 不应该依赖上下文
      this.onceMiddleware.push(fn);
    }
  }

  handle(ctx) {
    if (this.onceMiddleware.length) {
      const datas = this.onceMiddleware.map((fn) => {
        try {
          return fn(/** ctx */);
        } catch (error) {
          console.error(error);
        }
      });
      this.onceMiddleware = [];
      Object.assign(this.gdata, ...datas)
    }

    const payload = this.middleware.reduce((o, fn) => {
      try {
        const data = fn(ctx);
        return Object.assign(o, data);
      } catch (error) {
        console.error(error);
        return o;
      }
    }, {});

    return Promise.resolve(Object.assign({}, this.gdata, payload, ctx.payload));
  }

  push(data) {
    this.stack.push(data);
  }

  uploadData() {
    const data = this.stack.splice(0, this.limit);
    this.upload({ data });
  }

  persist() {
    clearTimeout(this.timer);
    this.storage.setItem(storageKey, JSON.stringify(this.stack));
  }

  receive(ctx) {
    this.handle(ctx).then((data) => {
      this.push(data);
      this.work();
    });
  }

  work() {
    if (this.stack.length) {
      if (!this.timer) {
        this.timer = setTimeout(() => {
          this.uploadData();
          this.work();
        }, this.timespan);
      }
    } else {
      this.timer = 0;
    }
  }

  destory() {
    this.persist();
  }
}

export default Reporter;
