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
    p.background(100);
    p.ellipse(400, 100, 240, 100)
  }

  return

};