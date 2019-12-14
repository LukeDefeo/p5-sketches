import p5Instance from "p5";


export function RecursiveTrianglesSketch(p: p5Instance) {

  const pallete = ['#002700', '#004000', '#035a00', '#1d7501', '#3e8f10', '#5baa30', '#77c64b', '#94e266', '#b3ff83']
  const maxDepth = 4
  const minDepth = 1

  function recursiveTriangle(size, depth) {
    const height = size * (Math.sqrt(3) / 2)

    p.noStroke()
    p.fill(pallete[depth + 3])

    p.triangle(
      0, 0,
      -size / 2, height,
      size / 2, height)

    const nextSize = size / 2

    if ((p.random(0,1) > 0.6 || depth > maxDepth) && depth > minDepth ) {
      return
    }
    // top triangle
    let nextDepth = depth + 1;
    recursiveTriangle(nextSize, nextDepth)

    //bottom left
    p.push()
    p.translate(-size / 4, height / 2)
    recursiveTriangle(nextSize, nextDepth)
    p.pop()

    //bottom right
    p.push()
    p.translate(size / 4, height / 2)
    recursiveTriangle(nextSize, nextDepth)
    p.pop()

    //upside down part
    p.push()
    p.translate(0, height )
    p.rotate(180)
    recursiveTriangle(nextSize, nextDepth)
    p.pop()

  }

  p.setup = () => {
    p.createCanvas(p.windowWidth, p.windowHeight);
    p.angleMode('degrees')
    // p.strokeWeight(0)
    p.frameRate(0)
    // p.blendMode(p.DIFFERENCE)

    let triangleSize = 300;

    // p.translate(p.windowWidth/2, 0)
    // recursiveTriangle(triangleSize, 0)
    // p.translate(0,triangleSize/2)
    // recursiveTriangle(triangleSize, 0)
    // p.translate(0,triangleSize/2)
    // recursiveTriangle(triangleSize, 0)




  }


}
