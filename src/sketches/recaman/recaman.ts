import p5 from "p5";
import {max} from 'lodash/fp'
import {partition, seq} from "./shared";

export const recamanSketch = (p: p5) => {

  function drawSequence(p: p5, seq: number[]) {

    let biggest = max(seq);

    const scaleFactor = p.width / biggest!

    const partitionedSeq = partition(seq, 2, 1)

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
      p.arc(scaledCenterX, scaledCenterY, scaledDiameter, scaledDiameter, startDegree, endDegree, "open")
    })


  }


  p.setup = () => {
    p.createCanvas(p.windowWidth * 0.95, p.windowHeight * 0.95);
    p.noFill()
    drawSequence(p, seq)

  }

  p.windowResized = () => {
    p.resizeCanvas(p.windowWidth, p.windowHeight);
  }


  p.draw = () => {


  }

  return

};
