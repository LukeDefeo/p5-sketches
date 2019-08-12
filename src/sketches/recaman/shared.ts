import p5 from "p5";
import {max} from "lodash/fp";

export const seqLong = [0, 1, 3, 6, 2, 7, 13, 20, 12, 21, 11, 22, 10, 23, 9, 24, 8, 25, 43, 62, 42, 63, 41, 18, 42, 17, 43, 16, 44, 15, 45, 14, 46, 79, 113, 78, 114, 77, 39, 78, 38, 79, 37, 80, 36, 81, 35, 82, 34, 83, 33, 84, 32, 85, 31, 86, 30, 87, 29, 88, 28, 89, 27, 90]
export const seq = [0, 1, 3, 6, 2, 7, 13, 20, 12, 21, 11, 22, 10, 23, 9, 24, 8, 25, 43, 62, 42, 63, 41, 18, 42, 17, 43, 16, 44, 15, 45, 14]

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

export const drawNumberLine = (p: p5, seq: number[]) => {
  let lineY = p.height / 2;
  p.line(0, lineY, p.width, lineY)


  //todo how to draw everything with padding?
  let drawPoint = 0

  let biggest = max(seq);

  const ratio = p.width / biggest!

  for (let i = 0; i < biggest! + 1; i++) {
    p.line(drawPoint, lineY, drawPoint, lineY + 10)
    p.text(i.toString(), drawPoint - 5, lineY + 20)
    drawPoint += ratio
  }

}