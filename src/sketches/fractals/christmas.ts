import p5Instance from "p5";


export function RecursiveChristmasSketch(p: p5Instance) {

  const greenPallete = ['#002700', '#004000', '#035a00', '#1d7501', '#3e8f10', '#5baa30', '#77c64b', '#94e266', '#b3ff83']

  function recursiveTriangle(size, minDepth, maxDepth, depth) {
    const height = size * (Math.sqrt(3) / 2)

    p.noStroke()
    p.fill(greenPallete[(depth + 2) + p.random([-1,0,1])])

    p.triangle(
      0, 0,
      -size / 2, height,
      size / 2, height)

    const nextSize = size / 2

    if ((p.random(0, 1) > 0.4 || depth > maxDepth) && depth > minDepth) {
      return
    }
    // top triangle
    let nextDepth = depth + 1;
    recursiveTriangle(nextSize, minDepth, maxDepth, nextDepth)

    //bottom left
    p.push()
    p.translate(-size / 4, height / 2)
    recursiveTriangle(nextSize, minDepth, maxDepth, nextDepth)
    p.pop()

    //bottom right
    p.push()
    p.translate(size / 4, height / 2)
    recursiveTriangle(nextSize, minDepth, maxDepth, nextDepth)
    p.pop()

    //upside down part
    p.push()
    p.translate(0, height)
    p.rotate(180)
    recursiveTriangle(nextSize, minDepth, maxDepth, nextDepth)
    p.pop()

  }


  const treePallete = ['#5c2b2b', '#4d2828', '#3a1c1c', '#221313', '#0f0606']

  function quadtree(size, minDepth, maxDepth, depth = 0) {
    p.fill(treePallete[depth])
    p.strokeWeight(1)
    p.square(0, 0, size)

    if ((p.random(0, 1) > 0.6 || depth > maxDepth) && depth > minDepth) {
      return
    }

    const nextSize = size / 2
    let nextDepth = depth + 1;
    //top left
    quadtree(nextSize, minDepth, maxDepth, nextDepth)

    //top right
    p.push()

    p.translate(size / 2, 0)
    quadtree(nextSize, minDepth, maxDepth, nextDepth)

    p.pop()

    //bottom left
    p.push()

    p.translate(0, size / 2)
    quadtree(nextSize, minDepth, maxDepth, nextDepth)

    p.pop()

    //bottom left
    p.push()

    p.translate(size / 2, size / 2)
    quadtree(nextSize, minDepth, maxDepth, nextDepth)

    p.pop()


  }

  function drawTree() {
    let triangleSize = 300;
    const triangleHeight = triangleSize * (Math.sqrt(3) / 2)


    const trianglemaxDepth = 3
    const triangleMinDepth = 2

    p.translate(p.windowWidth / 2, 10)
    recursiveTriangle(triangleSize, triangleMinDepth, trianglemaxDepth, 0)
    p.translate(0, triangleHeight / 2)
    recursiveTriangle(triangleSize, triangleMinDepth, trianglemaxDepth, 0)
    p.translate(0, triangleHeight / 2)
    recursiveTriangle(triangleSize, triangleMinDepth, trianglemaxDepth, 0)


    let stumpsize = 60;
    p.translate(-stumpsize / 2, triangleHeight)

    quadtree(stumpsize, 2, 3)

    p.translate(0, stumpsize)

    quadtree(stumpsize, 1, 3)
  }

  p.setup = () => {
    p.createCanvas(p.windowWidth, p.windowHeight);
    p.angleMode('degrees')
    // p.strokeWeight(0)
    p.frameRate(0)
    // p.blendMode(p.DIFFERENCE)

    // drawTree()

    p.noStroke()
    p.fill('red')
    p.translate(400,400)
    p.arc(0,0,200,200,0,30)

    // p.circle(0,0,200)

  }


}
