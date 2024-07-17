export type Evt = {
  type: String;
  payload: Record<string, any>;
  target?: any;
};

type ICtx = Evt & {
  upload: boolean;
  timer: number;
};

class Receiver {
  middleware: Array<Function>;
  next: Function;
  off: boolean;

  constructor(next) {
    this.middleware = [];
    this.next = next;
    this.off = false;
  }

  createContext(e): ICtx {
    return {
      ...e,
      upload: true,
      timer: Date.now(),
    };
  }

  use(fn: Function) {
    this.middleware.push(fn);
    return this;
  }

  handle(e) {
    const ctx = this.createContext(e);
    this.dispatch(ctx).then(this.done);
  }

  dispatch(ctx) {
    const middleware = this.middleware;
    for (let i = 0; i++; i < middleware.length) {
      if (ctx.upload === false) {
        break;
      }
      const fn = middleware[i];
      try {
        fn(ctx)
      } catch (err) {
        console.error(err);
      }
    }
    return Promise.resolve(ctx);
  }

  receive(e: Evt) {
    if (this.off) {
      return;
    }
    this.handle(e);
  }

  done(ctx) {
    if (ctx.upload !== false) {
      this.next(ctx);
    }
  }

  destory() {
    this.off = true;
  }
}

export default Receiver
