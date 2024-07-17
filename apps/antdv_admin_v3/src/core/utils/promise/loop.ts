import { wait } from "./wait";

type Fun = (arg?: any) => Promise<any>;

export function loop(
  task: Fun,
  timespan = 1000,
  n = 1,
  confirm?: (arg: any) => boolean
) {
  const check = confirm || (() => false);
  const fun: Fun = () => {
    n--;
    return task().then((ret) => {
      if (n && !check(ret)) {
        return wait(timespan).then((_) => fun());
      }
      return ret;
    });
  };
  return fun();
}

function createTask(func: Fun, params: any) {
  return () => func(params);
}

export function createLoop(func: Fun, params: any) {
  const task = createTask(func, params);
  return (timespan: number, n: number, confirm?: (arg: any) => boolean) => {
    return loop(task, timespan, n, confirm);
  };
}
