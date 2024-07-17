type Caller = (...args: any[]) => Promise<any>;
type Resolve = (value: void | PromiseLike<void>) => void;
type Reject = (reason?: any) => void;

// type PromiseFun = <T>(url: string) => Promise<T>;
// // 使用泛型定义返回Promise的函数
// const fetchData: FetchFunction = async <T>(url: string): Promise<T> => {
//   const response = await fetch(url);
//   return (await response.json()) as Promise<T>;
// };
class LimitPromise {
  /**
   * promise 并发
   * @param {Number} max 最大执行数
   */
  private max: number;
  private count: number;
  private quque: Array<Function>;

  constructor(max: number) {
    this.max = max;
    this.count = 0;
    this.quque = [];
  }

  call(caller: Caller, ...args: any[]): Promise<void> {
    return new Promise((resolve, reject) => {
      const task = this.createTask(caller, args, resolve, reject);
      if (this.count >= this.max) {
        this.quque.push(task);
      } else {
        task();
      }
    });
  }

  private createTask(
    caller: Caller,
    args: any[],
    resolve: Resolve,
    reject: Reject
  ) {
    return () => {
      caller(...args)
        .then(resolve)
        .catch(reject)
        .finally(() => {
          this.count--;
          if (this.quque.length) {
            const task = this.quque.shift();
            task!();
          }
        });
      this.count--;
    };
  }
}
