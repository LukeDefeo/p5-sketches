import p5Instance from "p5";
import {rad} from "csx";

export const HexagonMultipleSketch = (p: p5Instance) => {


  const drawHexagon = (centerX: number, centerY: number, radius: number, color: number[], offsetAngle: number, missing: number[]) => {

    const height = radius * (Math.sqrt(3) / 2)
    p.blendMode(p.SOFT_LIGHT)
    p.push()
    p.translate(centerX, centerY)
    p.rotate(30)
    for (let i = 0; i < 6; i++) {
      if (missing.includes(i)) {
        continue
      }

      p.push()

      // const [red, green, blue] = color
      p.fill(color)
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

    //overwrites blend so white wins
    p.blendMode(p.LIGHTEST)
    p.fill("white")
    p.push()
    p.translate(centerX, centerY)
    p.rotate(30)
    p.rotate(pos * 60)
    p.triangle(
      0, 0,
      -radius / 2, height,
      radius / 2, height
    )

    p.pop()

  }

  const colours = ['#00429d', '#2e59a8', '#4771b2', '#5d8abd', '#73a2c6', '#8abccf', '#a5d5d8', '#c5eddf', '#ffffe0']


  function drawhexagonWithCutOut(x: number, y: number, radius: number) {
    let lastCutout
    for (let i = 0; i < 3; i++) {

      const color = [p.random(colours)];
      const offsetAngle = p.random([0, 60, 120, 180, 240])
      const missing = p.random([0, 1, 2, 3, 4, 5])

      drawHexagon(x, y, radius, color, offsetAngle, [missing])

      lastCutout = missing
    }

    drawCutout(x, y, radius, lastCutout)
  }

  p.setup = () => {
    p.createCanvas(p.windowWidth * 0.95, p.windowHeight * 0.95);
    p.angleMode('degrees')
    p.strokeWeight(0)
    p.noStroke()

    p.frameRate(1)


    const startX = p.windowHeight / 3
    const startY = p.windowHeight / 3
    const radius = 100
    const height = radius * (Math.sqrt(3) / 2)


    //first row
    let x = startX
    let y = startY
    for (let i = 0; i < 3; i++) {
      drawhexagonWithCutOut(x, y, radius)
      x = x + height * 2
    }

    //second row
    x = startX - height
    y = startY + (height * 2)
    for (let i = 0; i < 4; i++) {
      drawhexagonWithCutOut(x, y, radius)
      x = x + height * 2
    }

    //third row
    x = startX
    y = y + (height * 2)
    for (let i = 0; i < 3; i++) {
      drawhexagonWithCutOut(x, y, radius)
      x = x + height * 2
    }


  }


  p.draw = () => {

  }

  p.windowResized = () => {
    p.resizeCanvas(p.windowWidth, p.windowHeight);
  }

  return

};
