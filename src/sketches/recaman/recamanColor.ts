import p5 from "p5";
import {find, isEqual, max, reverse} from 'lodash/fp'
import {drawNumberLine, partition, seq} from "./shared";

const whitePairs = [[0, 1], [3, 6], [6, 2], [13, 20], [20,12], [41,18], [18,42],]
const transparentPairs = [[25,43],[43, 62], [62,42]]

function drawSequenceNoColor(p: p5, sequence: number[]) {

  let biggest = max(sequence);

  const scaleFactor = p.width / biggest!

  const partitionedSeq = partition(sequence, 2, 1)
  p.noFill()
  p.stroke(1)
  partitionedSeq.forEach(([startX, endX], idx) => {

    const scaledStartX = startX * scaleFactor
    const scaledEndX = endX * scaleFactor
    const scaledCenterX = (scaledStartX + scaledEndX) / 2
    const scaledCenterY = p.height / 2
    const scaledDiameter = Math.abs(scaledEndX - scaledCenterX) * 2

    console.log(idx)
    let startDegree: number
    let endDegree: number

    if (idx % 2 === 0) {
      startDegree = p.PI
      endDegree = 2 * p.PI
    } else {
      startDegree = 0
      endDegree = p.PI
    }
    p.arc(scaledCenterX, scaledCenterY, scaledDiameter, scaledDiameter, startDegree, endDegree, "open")
  })
}

export const recamanSketchColor = (p: p5) => {

  const drawSequence = (p: p5, sequence: number[]) => {

    let biggest = max(sequence);

    const scaleFactor = p.width / biggest!

    const partitionedSeq = reverse(partition(sequence, 2, 1))

    console.log(`Size of seq ${sequence.length}`)
    partitionedSeq.forEach(([startX, endX], idx) => {

      const scaledStartX = startX * scaleFactor
      const scaledEndX = endX * scaleFactor
      const scaledCenterX = (scaledStartX + scaledEndX) / 2
      const scaledCenterY = p.height / 2
      const scaledDiameter = Math.abs(scaledEndX - scaledCenterX) * 2

      const nonReversedIdx = sequence.length - idx - 1
      console.log(nonReversedIdx)

      const [startDegree, endDegree] =
        idx % 2 == 0 ?
          [p.PI, 2 * p.PI] :
          [0, p.PI]

      p.noStroke()

      if (find(isEqual([startX, endX]), whitePairs)) {
        p.fill(255)
      } else if (find(isEqual([startX, endX]), transparentPairs)) {
        p.noFill()
      } else {
        p.fill(p.random(0, 255), p.random(0, 255), p.random(0, 255))
      }
      p.arc(scaledCenterX, scaledCenterY, scaledDiameter, scaledDiameter, startDegree, endDegree, "open")
    })
  }

  p.setup = () => {
    p.createCanvas(p.windowWidth * 0.95, p.windowHeight * 0.95);
    p.noFill()
    drawSequence(p, seq)
    drawSequenceNoColor(p, seq)
    drawNumberLine(p, seq)
  }

  p.windowResized = () => {
    p.resizeCanvas(p.windowWidth, p.windowHeight);
  }


  p.draw = () => {


  }

  return

};
