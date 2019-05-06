import p5 from "p5";
import {max} from 'lodash/fp'
import {partition, seq} from "./shared";

const basePointsPerCircle = 100

type Direction =
  | "Clockwise"
  | "AntiClockwise"

type StartPosition =
  | "Left"
  | "Right"

const calcPoint = (p: p5, progress: number, center: p5.Vector, radius: number, direction: Direction, startPosition: StartPosition) => {

  p.angleMode(p.DEGREES)

  if (direction == "Clockwise" && startPosition === "Left") {
    const degree = p.map(progress, 0, basePointsPerCircle, 180, 0)
    const pointX = radius * p.cos(degree)
    const pointY = radius * p.sin(degree)
    return p.createVector(pointX, pointY).add(center.x, center.y)

  } else if (direction == "Clockwise" && startPosition === "Right") {
    const degree = p.map(progress, 0, basePointsPerCircle, 0, 180)

    const pointX = radius * p.cos(degree)
    const pointY = radius * p.sin(degree)
    return p.createVector(pointX, pointY).add(center.x, center.y)

  } else if (direction == "AntiClockwise" && startPosition === "Left") {
    const degree = p.map(progress, 0, basePointsPerCircle, 180, 360)

    const pointX = radius * p.cos(degree)
    const pointY = radius * p.sin(degree)
    return p.createVector(pointX, pointY).add(center.x, center.y)

  } else {
    const degree = p.map(progress, 0, basePointsPerCircle, 360, 180)
    const pointX = radius * p.cos(degree)
    const pointY = radius * p.sin(degree)
    return p.createVector(pointX, pointY).add(center.x, center.y)
  }


}

export const recamanSketchAnimated = (p: p5) => {

  let biggest = max(seq);
  const scaleFactor = p.width / biggest! //why doesnt this one work?

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

    const center = p.createVector(scaledCenterX, scaledCenterY)
    const radius = Math.abs(scaledEndX - scaledCenterX)

    const endPoint = animated ? progress : basePointsPerCircle

    p.beginShape()

    for (let i = 0; i < endPoint; i++) {
      const direction = idx % 2 === 0 ? "AntiClockwise" : "Clockwise";
      const startPosition = (endX < startX) ? "Right" : "Left";
      const point = calcPoint(p, i, center, radius, direction, startPosition)
      // const point = calcPoint(p, i, center, radius, "Clockwise", "Right")
      p.vertex(point.x, point.y)

    }

    p.endShape()


    // p.arc(scaledCenterX, scaledCenterY, scaledDiameter, scaledDiameter, startDegree, endDegree, "open", 500)

    //todo try curve
    // p.curve()
  }




  const drawSequence = (p: p5, seq: number[]) => {

    // console.log(max)
    // console.log(seq)
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


      // if (idx > 1) {
      //   return
      // }
      if (idx > currentIdx) {
        return
      }


      drawCircle(p, idx, startX, endX, idx === currentIdx)
      if (progress === pointsPerCircle) {

        currentIdx++
        progress = 0
        // pointsPerCircle = pointsPerCircle + basePointsPerCircle
      }

      progress++


    })
    // progress++

  }

  p.setup = () => {
    p.createCanvas(p.windowWidth * 0.95, p.windowHeight * 0.95);
    p.frameRate(40)

    // drawNumberLine(p, seq)

  }

  p.windowResized = () => {
    p.resizeCanvas(p.windowWidth, p.windowHeight);

  }

  p.draw = () => {

    drawSequence(p, seq)
    // drawNumberLine(p, seq)

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

  return

};
