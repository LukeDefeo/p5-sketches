import p5Instance from "p5";
import {rad} from "csx";

export const HexagonSketch = (p: p5Instance) => {

  const pythag = (x: number, y: number) => {

    return p.sqrt((x * x) + (y * y))
  }

  const drawHexagon = (centerX: number, centerY: number, radius: number, color: number[], offsetAngle: number, missing: number[]) => {

    const height = radius * (Math.sqrt(3) / 2)
    p.push()
    p.translate(centerX, centerY)
    p.rotate(30)
    for (let i = 0; i < 6; i++) {
      if (missing.includes(i)) {
        continue
      }

      p.push()

      const [red, green, blue] = color
      p.fill(red, green, blue)
      p.rotate(60 * i)
      p.triangle(
        0, 0,
        -radius / 2, height,
        radius / 2, height
      )
      p.pop()
    }

    p.pop()
  }

  const drawCutout = (centerX: number, centerY: number, radius: number, pos: number) => {
    const height = radius * (Math.sqrt(3) / 2)

    p.translate(centerX, centerY)
    p.rotate(30)
    p.rotate(pos * 60)
    p.fill("white")
    p.triangle(
      0, 0,
      -radius / 2, height,
      radius / 2, height
    )

  }


  p.setup = () => {
    p.createCanvas(p.windowWidth * 0.95, p.windowHeight * 0.95);
    p.angleMode('degrees')
    p.strokeWeight(0)
    p.frameRate(1)
    p.blendMode(p.DIFFERENCE)

    let lastCutout
    for (let i = 0; i < 2; i++) {



      const color = [p.random(0, 255), p.random(0, 255), p.random(0, 255)];
      const offsetAngle = p.random([0, 60, 120, 180, 240])
      const missing = p.random([0, 1, 2, 3, 4, 5])

      console.log('drawing', missing)
      drawHexagon(400, 400, 100, color, offsetAngle, [missing])


      p.push()

      drawHexagon(600, 100 +( 200 * i), 50, color, offsetAngle, [missing])

      p.pop()
      lastCutout = missing
    }

    p.blendMode(p.LIGHTEST)
    drawCutout(400, 400, 100, lastCutout)

    console.log("done")
  }


  p.draw = () => {

  }

  p.windowResized = () => {
    p.resizeCanvas(p.windowWidth, p.windowHeight);
  }

  return

};
