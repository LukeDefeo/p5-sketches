import p5 from "p5";
import {max} from 'lodash/fp'
import {partition, seq} from "./shared";


type Direction =
  | "Clockwise"
  | "AntiClockwise"

type StartPosition =
  | "Left"
  | "Right"

const calcPoint = (p: p5, progress: number, pointsPerCircle: number, center: p5.Vector, radius: number, direction: Direction, startPosition: StartPosition) => {

  if (progress > pointsPerCircle) {
    console.log(`out of range ${progress}  of ${pointsPerCircle}`)
  }

  if (direction == "Clockwise" && startPosition === "Left") {

    const degree = p.map(progress, 0, pointsPerCircle, 180, 0,)
    const pointX = radius * p.cos(degree)
    const pointY = radius * p.sin(degree)
    return p.createVector(pointX, pointY).add(center.x, center.y)
  } else if (direction == "Clockwise" && startPosition === "Right") {

    const degree = p.map(progress, 0, pointsPerCircle, 0, 180)
    const pointX = radius * p.cos(degree)
    const pointY = radius * p.sin(degree)
    return p.createVector(pointX, pointY).add(center.x, center.y)

  } else if (direction == "AntiClockwise" && startPosition === "Left") {

    const degree = p.map(progress, 0, pointsPerCircle, 180, 360)
    const pointX = radius * p.cos(degree)
    const pointY = radius * p.sin(degree)
    return p.createVector(pointX, pointY).add(center.x, center.y)

  } else {

    const degree = p.map(progress, 0, pointsPerCircle, 360, 180)
    const pointX = radius * p.cos(degree)
    const pointY = radius * p.sin(degree)
    return p.createVector(pointX, pointY).add(center.x, center.y)
  }
}

const drawSemiCircle = (
  p: p5,
  idx: number,
  startX: number,
  endX: number,
  pointsPerCircle: number,
  progress: number,
  animated: boolean
) => {

  if (animated) {
    // console.log(`Drawing animated circle with ${progress} of   ${pointsPerCircle} ${endX - startX} diff`)
  }

  let biggest = max(seq);
  const scaleFactor = p.width / biggest!

  const scaledStartX = startX * scaleFactor
  const scaledEndX = endX * scaleFactor
  const scaledCenterX = (scaledStartX + scaledEndX) / 2
  const scaledCenterY = p.height / 2

  const center = p.createVector(scaledCenterX, scaledCenterY)
  const radius = Math.abs(scaledEndX - scaledCenterX)

  const endPoint = animated ? progress : pointsPerCircle

  p.beginShape()

  const direction = idx % 2 === 0 ? "AntiClockwise" : "Clockwise"
  const startPosition = (endX < startX) ? "Right" : "Left"

  for (let i = 0; i < endPoint; i++) {
    const point = calcPoint(p, i, pointsPerCircle, center, radius, direction, startPosition)
    p.vertex(point.x, point.y)
  }

  p.endShape()
}


export const recamanSketchAnimated = (p: p5) => {

  let animatedCircleProgress = 0
  let animatedCircleIndex = 0

  const drawSequence = (p: p5, seq: number[]) => {

    const partitionedSeq = partition(seq, 2, 1)




    partitionedSeq.forEach(([startX, endX], idx) => {

      if (idx > animatedCircleIndex) {
        return
      }

      // console.log(`past filter drawing ${idx}`)

      let biggest = max(seq);
      const scaleFactor = p.width / biggest!
      const totalPointsInSemiCircle = scaleFactor * Math.abs(endX - startX) * p.PI
      const animating = idx === animatedCircleIndex;

      drawSemiCircle(
        p,
        idx,
        startX,
        endX,
        totalPointsInSemiCircle,
        animatedCircleProgress,
        animating
      )

      console.log(`Scale factor  ${scaleFactor}`)

      if (animating){
        // console.log(`about to draw circle with idx ${idx} animated idx ${animatedCircleIndex}  ${animatedCircleProgress}/${totalPointsInSemiCircle}`)
      }

      if (animating) {
        animatedCircleProgress++
      }

      if (animating && animatedCircleProgress > totalPointsInSemiCircle ) {
        console.log(`resetting ${idx}`)
        animatedCircleIndex++
        animatedCircleProgress = 0
      }


    })

  }

  p.setup = () => {
    p.noFill()
    p.stroke(0);
    p.strokeWeight(1);
    p.angleMode(p.DEGREES)
    p.createCanvas(p.windowWidth * 0.95, p.windowHeight * 0.95);
    p.frameRate(60)

    // drawNumberLine(p, seq)
  }

  p.windowResized = () => {
    p.resizeCanvas(p.windowWidth, p.windowHeight);

  }

  p.draw = () => {

    p.clear()
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

    for (let i = 0; i < biggest! + 1; i++) {
      p.line(drawPoint, lineY, drawPoint, lineY + 10)
      p.text(i.toString(), drawPoint - 5, lineY + 20)
      drawPoint += ratio
    }

  }

  return

};
