// @ts-ignore
import { wait } from "./wait";

type Fun = (arg?: any) => Promise<any>;

const confirmDef = () => false

type Again = {
  ck?: (arg: any) => boolean
  retries?: number
}


// function retry(fn: () => Promise<any>, retries: number = 0, delay: number = 1000) {
//   return new Promise(({resolve, reject}) => {

//   })
// }

function retry(fn: () => Promise<any>,  delay: number = 1000,  again: Again = {}) {
  let retries = 1
  let confirm
  let t = 0
  if (typeof again === 'function') {
    confirm = again
  }
  if (typeof again === 'number') {
    retries = again
  }

  // @ts-ignore
  return new Promise(({resolve, reject}) => {
    const fun = () => {
      retries--
      return fn().then(x => {

      })
    }
  })
}

// retries

// delay

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
