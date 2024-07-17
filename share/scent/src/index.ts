import Mido from "../../mido/src/index";
import type { Handler } from "../../mido/src/index";
let _messageId: number = 0;

const newMsgId = (): number => ++_messageId;

const genRid = (): string => Math.random().toString(32).slice(-8);

function isPromise(o: any): boolean {
  return typeof o?.then === "function";
}

function purify(message: any): boolean {
  if (!message.data) {
    return false;
  }
  if (typeof message.data !== "object") {
    return false;
  } else {
    return "_scent_" in message.data;
  }
}

function postMsg(message: any, win: Window): void {
  message["_scent_"] = true;
  win.postMessage(message, "*");
}


interface IMessage {
  name: string;
  msgId?: number;
  sourceId?: string;
  targetId?: string;
  payload?: any;
}

abstract class SNode {
  protected _id: string;
  protected _events: Mido;
  protected _callbacks: {
    [id: number]: {
      resolve: (value: unknown) => void;
      reject: (reason?: any) => void;
    };
  };

  constructor(events: Mido) {
    this._id = genRid();
    this._events = events;
    this._callbacks = {};
  }

  mailTo(message: IMessage) {
    const msgId = newMsgId();
    message.msgId = msgId;

    return new Promise((resolve, reject) => {
      this._callbacks[msgId] = { resolve, reject };
      this.broadcast(message);
    });
  }

  trigger(msgId: number, payload: any) {
    if (this._callbacks[msgId]) {
      this._callbacks[msgId].resolve(payload);
      delete this._callbacks[msgId];
    }
  }

  reply(message: IMessage, value: any) {
    message.targetId = message.sourceId;
    if (isPromise(value)) {
      // 这个处理好像没有太多必要
      value.then((val: any) => {
        message.payload = val;
        this.send(message);
      });
    } else {
      if (typeof value === "function") {
        throw new Error(`scent[${this._id}]不支持返回函数[${message.name}]`);
      } else {
        message.payload = value;
        this.send(message);
      }
    }
  }

  fire(name: string, payload: any) {
    if (this._events.has(name)) {
      const result = this._events.emit(name, payload);
      // #tag 适配下
      return result![0];
    }
    return "__NULL__";
  }

  abstract broadcast(message: IMessage): void;
  abstract receive(message: IMessage, win?: Window): void;
  abstract send(message: IMessage): void;
}

class Hub extends SNode {
  private _pigeons: Array<{ id: string; win: Window }>;
  constructor(events: Mido) {
    super(events);
    this._pigeons = [];
  }
  /// 添加节点
  push(id: string, win: Window) {
    const pigeon = this._pigeons.find((el) => el.id === id);
    if (!pigeon) {
      this._pigeons.push({ id, win });
    }
  }
  /// 同步
  sync(sourceId: string | undefined) {
    if (sourceId) {
      this._pigeons = this._pigeons.filter((el) => el.id !== sourceId);
    } else {
      this._pigeons = this._pigeons.filter((el) => el.win.parent !== undefined);
    }
  }
  /// 广播
  broadcast(message: IMessage) {
    this._pigeons.forEach((el) => {
      if (message.sourceId !== el.id) {
        postMsg(message, el.win);
      }
    });
  }
  /// 转发消息
  send(message: IMessage) {
    const pigeon = this._pigeons.find((el) => el.id === message.targetId);
    if (pigeon) {
      postMsg(message, pigeon.win);
    }
  }
  /// 接收消息
  receive(message: IMessage, win: Window) {
    const { name, msgId, sourceId, targetId, payload } = message;
    if (name === "ready") {
      // 添加节点
      this.push(sourceId!, win);
    } else if (name === "sync") {
      this.sync(sourceId!);
    } else {
      if (targetId) {
        if (targetId === this._id) {
          // 接收到应答, 调用callback
          this.trigger(msgId!, payload);
        } else {
          // 转发应答消息
          this.send(message);
        }
      } else {
        // 接收到广播，检查是否订阅此事件
        const value = this.fire(name, payload);
        if (value === "__NULL__") {
          // 未订阅, 向下广播
          this.broadcast(message);
        } else if (msgId && sourceId) {
          // 回复消息
          this.reply(message, value);
        }
      }
    }
  }
}

class Nub extends SNode {
  private _pigeon: Window;
  constructor(events: Mido) {
    super(events);
    this._pigeon = window;
    this.ready();
  }
  ready() {
    let win = this._pigeon;
    while ((win = win.parent)) {
      if (win === win.parent) {
        break;
      }
    }
    this._pigeon = win;

    this.send({ name: "ready" });

    window.addEventListener("unload", () => {
      this.send({ name: "sync" });
    });
  }
  broadcast(message: IMessage) {
    this.send(message);
  }
  send(message: IMessage) {
    message.sourceId = this._id;
    postMsg(message, this._pigeon);
  }
  receive(message: IMessage) {
    const { name, msgId, sourceId, targetId, payload } = message;
    // 接收到应答, 调用callback
    if (targetId && targetId === this._id) {
      this.trigger(msgId!, payload);
    } else {
      // 接收到广播，检查是否订阅此事件
      const value = this.fire(name, payload);
      if (value === "__NULL__") {
        // 未订阅
      } else if (msgId && sourceId) {
        // 回复消息
        this.reply(message, value);
      }
    }
  }
}

class Scent {
  private static instance: Scent;

  private _events: Mido;
  private _cos: SNode;

  private constructor() {
    this._events = new Mido();

    const win = window;
    if (win === win.parent) {
      this._cos = new Hub(this._events);
    } else {
      this._cos = new Nub(this._events);
    }

    win.addEventListener("message", (e) => {
      if (purify(e)) {
        this._cos.receive(e.data, e.source as Window);
      }
    });
  }

  // public static getInstance() {
  //   if (!Scent.instance) {
  //     Scent.instance = new Scent();
  //   }

  //   return Scent.instance;
  // }

  public static get ins() {
    if (!Scent.instance) {
      Scent.instance = new Scent();
    }

    return Scent.instance;
  }

  emit(name: string, payload: any) {
    return this._cos.broadcast({
      name,
      payload,
    });
  }
  call(name: string, payload: any) {
    return this._cos.mailTo({
      name,
      payload,
    });
  }
  on(name: string, callback: Handler) {
    if (this._events.has(name)) {
      // 绑定一个订阅
      this._events.off(name);
    }
    this._events.on(name, callback);
    return this;
  }
  off(name: string) {
    this._events.off(name);
    return this;
  }
}

export default Scent;

