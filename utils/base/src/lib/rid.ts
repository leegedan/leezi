export const rid = () => Math.random().toString(36).slice(-10)

const hexList: string[] = [];
for (let i = 0; i <= 15; i++) {
  hexList[i] = i.toString(16);
}

export function buildUUID(): string {
  let uuid = '';
  for (let i = 1; i <= 36; i++) {
    if (i === 9 || i === 14 || i === 19 || i === 24) {
      uuid += '-';
    } else if (i === 15) {
      uuid += 4;
    } else if (i === 20) {
      uuid += hexList[(Math.random() * 4) | 8];
    } else {
      uuid += hexList[(Math.random() * 16) | 0];
    }
  }
  return uuid;
}

let unique = 0;
export function buildUID(prefix = ''): string {
//   const time = Date.now();
  const random = Math.floor(Math.random() * 1000000000);
  unique++;
//   return prefix + '_' + random + unique + String(time);
  return prefix + random + unique;
}

export function newId() {
  return ++unique;
}
