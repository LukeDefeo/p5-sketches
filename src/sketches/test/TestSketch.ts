import p5 from "p5"

export const testSketch = (p: p5) => {

  console.log("pre")

  p.preload = () => {

  }

  p.setup = () => {
    console.log("setup")

    p.createCanvas(p.windowWidth, p.windowHeight);
  }

  p.windowResized = () => {
    // p.resizeCanvas(p.windowWidth, p.windowHeight);
  }

  p.draw = () => {
    p.beginShape()

    const offset = p.createVector(100,100)
    p.vertex(100,100)
    p.vertex(200,200)
    p.vertex(200,100)
    p.vertex(100,200)

    // p.background(100);
    // p.ellipse(400, 100, 240, 100)
    p.endShape(p.CLOSE)
  }

  return

};