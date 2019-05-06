import p5 from "p5";
import {max} from 'lodash/fp'
import {partition, seq} from "./shared";


let x = 0
console.log(x)
export const recamanSketchAnimated = (p: p5) => {

  let biggest = max(seq);
  const scaleFactor = p.width / biggest!

  const basePointsPerCircle = 100
  let pointsPerCircle = basePointsPerCircle
  let progress = 0
  let currentIdx = 0

  const drawCircle = (p: p5, idx: number, startX: number, endX: number, animated: boolean) => {

    let biggest = max(seq);
    const scaleFactor = p.width / biggest!

    const scaledStartX = startX * scaleFactor
    const scaledEndX = endX * scaleFactor
    const scaledCenterX = (scaledStartX + scaledEndX) / 2
    const scaledCenterY = p.height / 2
    const scaledDiameter = Math.abs(scaledEndX - scaledCenterX) * 2

    let startDegree: number
    let endDegree: number

    if (idx % 2 === 0) {
      startDegree = p.PI
      if (animated) {
        endDegree = p.map(progress, 0, pointsPerCircle, p.PI, 2 * p.PI)
      } else {
        endDegree = 2 * p.PI
      }
    } else {
      startDegree = 0
      if (animated) {
        endDegree = p.map(progress, 0, pointsPerCircle, 0, p.PI)
      } else  {
        endDegree = p.PI
      }
    }

    p.arc(scaledCenterX, scaledCenterY, scaledDiameter, scaledDiameter, startDegree, endDegree, "open", 500)

    //todo try curve
    // p.curve()
  }

  const drawSequence = (p: p5, seq: number[]) => {

    console.log(max)
    console.log(seq)
    let biggest = max(seq);
    const scaleFactor = p.width / biggest!

    // console.log(scaleFactor)
    // console.log(`Width ${p.width} biggest ${biggest} scale factor ${scaleFactor} `)

    const partitionedSeq = partition(seq, 2, 1)

    p.noFill()
    p.stroke(0);
    p.strokeWeight(1);
    p.clear()

    // p.noStroke()
    partitionedSeq.forEach(([startX, endX], idx) => {

      if (idx > currentIdx) {
        return
      }

      // const scaledStartX = startX * scaleFactor
      // const scaledEndX = endX * scaleFactor
      // const scaledCenterX = (scaledStartX + scaledEndX) / 2
      // const scaledCenterY = p.height / 2
      // const scaledDiameter = Math.abs(scaledEndX - scaledCenterX) * 2
      //
      // let startDegree: number
      // let endDegree: number
      //
      // if (idx % 2 === 0) {
      //   startDegree = p.PI
      //   endDegree = p.map(progress, 0, pointsPerCircle, p.PI, 2 * p.PI)
      // } else {
      //   startDegree = 0
      //   endDegree = p.map(progress, 0, pointsPerCircle, 0, p.PI)
      // }
      //
      // p.arc(scaledCenterX, scaledCenterY, scaledDiameter, scaledDiameter, startDegree, endDegree, "open", 500)



      drawCircle(p,idx,startX,endX, idx === currentIdx)
      progress++
      if (progress === pointsPerCircle) {

        // console.log(`${startDegree} to ${endDegree}`)
        // console.log("reseting progress")

        currentIdx++
        progress = 0
        pointsPerCircle  = pointsPerCircle + basePointsPerCircle
      }


    })
    // progress++


  }

  p.setup = () => {
    p.createCanvas(p.windowWidth * 0.95, p.windowHeight * 0.95);
    p.frameRate(60)
    // drawNumberLine(p, seq)

  }

  p.windowResized = () => {
    p.resizeCanvas(p.windowWidth, p.windowHeight);

  }

  p.draw = () => {
    drawSequence(p, seq)
  }

  return

};
