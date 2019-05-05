import p5 from "p5";
import {max} from 'lodash/fp'

const seqLong = [0, 1, 3, 6, 2, 7, 13, 20, 12, 21, 11, 22, 10, 23, 9, 24, 8, 25, 43, 62, 42, 63, 41, 18, 42, 17, 43, 16, 44, 15, 45, 14, 46, 79, 113, 78, 114]

const seq = [0, 1, 3, 6, 2, 7, 13, 20, 12, 21, 11, 22, 10, 23, 9, 24, 8, 25, 43,62, 42, 63, 41, 18, 42, 17, 43, 16, 44, 15, 45, 14, 46]

function partition<T>(coll: T[], size: number, step: number): T[][] {
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


export const recamanSketch = (p: p5) => {

  p.preload = () => {

  }

  function drawSequence(p: p5, seq: number[]) {

    let biggest = max(seq);

    const scaleFactor = p.width / biggest!

    console.log(scaleFactor)

    console.log(`Width ${p.width} biggest ${biggest} scale factor ${scaleFactor} `)

    const partitionedSeq = partition(seq, 2, 1)

    p.noFill()
    partitionedSeq.forEach(([startX, endX], idx) => {

      const scaledStartX = startX * scaleFactor
      const scaledEndX = endX * scaleFactor
      const scaledCenterX = (scaledStartX + scaledEndX) / 2
      const scaledCenterY = p.height / 2
      const scaledDiameter = Math.abs(scaledEndX - scaledCenterX) * 2


      console.log(idx)
      let startDegree: number
      let endDegree: number

      if (idx % 2 == 0) {
        startDegree = p.PI
        endDegree = 2 * p.PI
      } else {
        startDegree = 0
        endDegree = p.PI
      }
      p.arc(scaledCenterX, scaledCenterY, scaledDiameter , scaledDiameter, startDegree, endDegree, "open")
    })


  }

  const drawNumberLine = (p: p5, seq: number[]) => {
    let lineY = p.height / 2;
    p.line(0, lineY, p.width, lineY)

    //todo how to draw everything with padding?
    let drawPoint = 0

    let biggest = max(seq);

    const scaleFactor = p.width / biggest!

    for (let i = 0; i < biggest! + 1; i++) {
      p.line(drawPoint, lineY, drawPoint, lineY + 10)
      p.text(i.toString(), drawPoint - 5, lineY + 20)
      p.text((i * scaleFactor).toFixed(0), drawPoint - 5, lineY + 50)
      drawPoint += scaleFactor
    }
  }

  p.setup = () => {
    p.createCanvas(p.windowWidth * 0.95, p.windowHeight * 0.95);
    // drawNumberLine(p, seq)

    drawSequence(p, seq)

  }

  p.windowResized = () => {
    p.resizeCanvas(p.windowWidth, p.windowHeight);
  }


  p.draw = () => {


  }

  return

};
