import p5 from "p5";
import {max} from 'lodash/fp'

const seqLong = [0, 1, 3, 6, 2, 7, 13, 20, 12, 21, 11, 22, 10, 23, 9, 24, 8, 25, 43, 62, 42, 63, 41, 18, 42, 17, 43, 16, 44, 15, 45, 14, 46, 79, 113, 78, 114]
const seq = [0, 1, 3, 6, 2, 7, 13, 20, 12, 21, 11, 22, 10, 23, 9]

export const recamanSketch = (p: p5) => {


  p.preload = () => {

  }

  p.setup = () => {
    p.createCanvas(p.windowWidth * 0.95, p.windowHeight * 0.95);
    drawNumberLine(p, seq)

  }

  p.windowResized = () => {
    p.resizeCanvas(p.windowWidth, p.windowHeight);
  }


  const drawNumberLine = (p: p5, seq: number[]) => {
    let lineY = p.height / 2;
    p.line(0, lineY, p.width, lineY)


    //todo how to draw everything with padding?
    let drawPoint = 0

    let biggest = max(seq);

    const ratio = p.width / biggest!

    for (let i = 0; i < biggest! + 1; i++ ) {
      p.line(drawPoint, lineY, drawPoint,lineY + 10)
      p.text(i.toString(),drawPoint - 5,lineY + 20)
      drawPoint += ratio
    }

  }


  p.draw = () => {

    // p.background(100);
    // p.ellipse(400, 100, 240, 100)
  }

  return

};
