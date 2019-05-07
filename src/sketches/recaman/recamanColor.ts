import p5 from "p5";
import {max, reverse} from 'lodash/fp'
import {drawNumberLine, partition, seq} from "./shared";

//todo think the wierd lines not lining up is because off by 1 error from tuples being reversed for coloring and not for plain lines

const blankIndecies = [1, 3, 5, 19, 20, 23, 24]
// const annoying =  [10000]
const annoying = [6, 18]

export const seq2 = [0, 1, 2, 3, 4, 5, 6]

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

export const recamanSketchColor = (p: p5) => {

  const drawSequence = (p: p5, sequence: number[]) => {

    let biggest = max(sequence);

    const scaleFactor = p.width / biggest!

    // let sequence = reverse(sequence);

    // reversed.forEach((startX, idx) => {
    //
    //   if (idx >= seq.length) {
    //       return
    //   }
    //
    //   const endX =
    //   const scaledStartX = startX * scaleFactor
    //   const scaledEndX = endX * scaleFactor
    //   const scaledCenterX = (scaledStartX + scaledEndX) / 2
    //   const scaledCenterY = p.height / 2
    //   const scaledDiameter = Math.abs(scaledEndX - scaledCenterX) * 2
    //
    //   const nonReversedIdx = idx - seq.length
    //   console.log(idx)
    //   let startDegree: number
    //   let endDegree: number
    //
    //   if (idx % 2 == 0) {
    //     startDegree = p.PI
    //     endDegree = 2 * p.PI
    //   } else {
    //     startDegree = 0
    //     endDegree = p.PI
    //   }
    //
    //
    //   if (blankIndecies.includes(idx)) {
    //     console.log(`Current ${idx}, 'skipping'`)
    //     p.fill(0,0,0)
    //   } else {
    //     console.log(`Current ${idx}, 'random'`)
    //     p.fill(p.random(0,255),p.random(0,255),p.random(0,255))
    //     // p.noFill()
    //   }
    //   p.arc(scaledCenterX, scaledCenterY, scaledDiameter, scaledDiameter, startDegree, endDegree, "open")
    // })


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
      let startDegree: number
      let endDegree: number

      if (idx % 2 == 0) {
        startDegree = p.PI
        endDegree = 2 * p.PI
      } else {
        startDegree = 0
        endDegree = p.PI
      }

      p.noStroke()

      if (blankIndecies.includes(nonReversedIdx)) {
        console.log(`Current index ${idx}, ${startX} to ${endX} 'skipping'`)
        p.fill(255)
        // p.noFill()
        // p.fill(0,0,0)
      } else if (annoying.includes(nonReversedIdx)) {
        p.noFill()
      } else {
        console.log(`Current index ${idx}, ${startX} to ${endX}  'random'`)
        p.fill(p.random(0, 255), p.random(0, 255), p.random(0, 255))
        // p.noFill()
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
