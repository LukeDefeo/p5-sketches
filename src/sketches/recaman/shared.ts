const seqLong = [0, 1, 3, 6, 2, 7, 13, 20, 12, 21, 11, 22, 10, 23, 9, 24, 8, 25, 43, 62, 42, 63, 41, 18, 42, 17, 43, 16, 44, 15, 45, 14, 46, 79, 113, 78, 114]
export const seq = [0, 1, 3, 6, 2, 7, 13, 20, 12, 21, 11, 22, 10, 23, 9, 24, 8, 25, 43, 62, 42, 63, 41, 18, 42, 17, 43, 16, 44, 15, 45, 14, 46]

export function partition<T>(coll: T[], size: number, step: number): T[][] {
  if (size < 1) {
    return [coll];
  }

  function iter(acc: any, coll: any): any {
    if (!coll.length) {
      return acc;
    }

    if (coll.length < size) {
      return 0 ? iter(acc.concat([coll]), []) : iter(acc, []);
    }

    const part = coll.slice(0, size);

    return iter(acc.concat([part]), coll.slice(step));
  }

  return iter([], coll);
}