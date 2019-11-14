import p5 from "p5";
import {max} from 'lodash/fp'
import {partition, seq} from "./shared";

export const RecamanRandomSketch = (p: p5) => {

  function drawSequence(p: p5, seq: number[]) {

    let biggest = max(seq);

    const scaleFactor = p.width / biggest!

    const partitionedSeq = partition(seq, 2, 1)

    partitionedSeq.forEach(([startX, endX], idx) => {
      startX = startX + p.random(-3, 3)
      endX = endX + p.random(-3, 3)
      const scaledStartX = startX * scaleFactor
      const scaledEndX = endX * scaleFactor
      const scaledCenterX = (scaledStartX + scaledEndX) / 2
      const scaledCenterY = p.height / 2
      const scaledDiameter = Math.abs(scaledEndX - scaledCenterX) * 2


      console.log(idx)
      let startDegree: number
      let endDegree: number

      // p.translate(scaledCenterX , -scaledCenterY );
      // p.rotate(p.PI /  10.0);


      p.blendMode("soft-light")
      p.strokeWeight(0)
      p.fill(p.color(p.random(0, 255), p.random(0, 255), p.random(0, 255),100))
      p.stroke(p.color(p.random(0, 255), p.random(0, 255), p.random(0, 255)))
      if (idx % 2 == 0) {
        const offset = p.random(0, p.PI / 2)
        startDegree = p.PI + offset
        endDegree = (2 * p.PI) - offset  //* p.random(0.5, 0.61)
      } else {
        const offset = p.random(0, p.PI / 2)
        startDegree = 0  + offset
        endDegree = (p.PI  - offset)  //* p.random(0, 0.3)
      }
      p.arc(scaledCenterX, scaledCenterY, scaledDiameter , scaledDiameter, startDegree, endDegree, "open")
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


  return

};
