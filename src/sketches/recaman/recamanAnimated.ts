import p5 from "p5";
import {max} from 'lodash/fp'
import {partition, seq, seqLong} from "./shared";


type Direction =
  | "Clockwise"
  | "AntiClockwise"

type StartPosition =
  | "Left"
  | "Right"

const calcPoint = (
  p: p5,
  progress: number,
  pointsPerCircle: number,
  center: p5.Vector,
  radius: number,
  direction: Direction,
  startPosition: StartPosition
) => {

  let degree

  if (direction == "Clockwise" && startPosition === "Left") {
    degree = p.map(progress, 0, pointsPerCircle, 180, 0,)
  } else if (direction == "Clockwise" && startPosition === "Right") {
    degree = p.map(progress, 0, pointsPerCircle, 0, 180)
  } else if (direction == "AntiClockwise" && startPosition === "Left") {
    degree = p.map(progress, 0, pointsPerCircle, 180, 360)
  } else {
    degree = p.map(progress, 0, pointsPerCircle, 360, 180)
  }

  const pointX = radius * p.cos(degree)
  const pointY = radius * p.sin(degree)
  return p.createVector(pointX, pointY).add(center.x, center.y)
}

const drawSemiCircle = (
  p: p5,
  scaleFactor: number,
  idx: number,
  startX: number,
  endX: number,
  pointsPerCircle: number,
  progress: number,
  animated: boolean
) => {

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

  const drawSequence = (p: p5, sequence: number[]) => {

    let biggest = max(sequence);
    const scaleFactor = p.width / biggest!

    const partitionedSeq = partition(sequence, 2, 1)

    partitionedSeq.forEach(([startX, endX], idx) => {

      if (idx > animatedCircleIndex) {
        return
      }

      const totalPointsInSemiCircle = scaleFactor * Math.abs(endX - startX) * p.PI
      const animating = idx === animatedCircleIndex;

      drawSemiCircle(
        p,
        scaleFactor,
        idx,
        startX,
        endX,
        totalPointsInSemiCircle,
        animatedCircleProgress,
        animating
      )


      if (animating) {
        const speed = 100
        animatedCircleProgress += speed
        // animatedCircleProgress++

        if (animatedCircleProgress > totalPointsInSemiCircle) {
          animatedCircleIndex++
          animatedCircleProgress = 0
        }
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

    const s = seqLong
    p.clear()
    drawSequence(p, s)
    // drawNumberLine(p, s)

  }

  return

};
