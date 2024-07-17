export type EventType = string | symbol;
export type Handler<T = unknown> = (event: T) => any;
type EventHandlerList<T = unknown> = Array<Handler<T>>;

class Mido {
  private store: Map<EventType, EventHandlerList>;
  constructor() {
    this.store = new Map();
  }
  on(type: EventType, handler: Handler) {
    const handlers = this.store.get(type);
    if (handlers) {
      handlers.push(handler);
    } else {
      this.store.set(type, [handler]);
    }
  }
  off(type: EventType, handler?: Handler): void {
    const handlers = this.store.get(type);
    if (handlers) {
      if (handler) {
        handlers.splice(handlers.indexOf(handler) >>> 0, 1);
      } else {
        this.store.delete(type);
      }
    }
  }
  has(type: EventType) {
    return this.store.has(type);
  }
  emit(type: EventType, e: any) {
    const handlers = this.store.get(type);
    if (handlers) {
      return handlers.slice().map((handler) => {
        return handler(e);
      });
    }
  }
}

export default Mido;
