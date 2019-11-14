import p5 from "p5";

class Walker {
  private x: number;
  private y: number;
  private p: p5

  constructor(p: p5) {
    this.x = p.width / 2
    this.y = p.height / 2
    this.p = p
  }

  walkBasic() {
    const choice = this.p.floor(this.p.random(4));

    if (choice === 0) {
      this.x++;
    } else if (choice === 1) {
      this.x--;
    } else if (choice === 2) {
      this.y++;
    } else {
      this.y--;
    }
  }

  walk9Dir() {
    var stepx = this.p.floor(this.p.random(3))-1;
    var stepy = this.p.floor(this.p.random(3))-1;
    this.x += stepx;
    this.y += stepy;
  }

  display() {
    this.p.stroke(0, 0, 0);
    this.p.point(this.x, this.y);
  }
}

export const RandomWalker = (p: p5) => {

  let walker: Walker
  p.setup = () => {
    // p.no
    p.createCanvas(p.windowWidth * 0.95, p.windowHeight * 0.95);
    // p.noFill()

    walker = new Walker(p)

  }

  p.windowResized = () => {
    p.resizeCanvas(p.windowWidth, p.windowHeight);
  }

  p.draw = () => {
    walker.walk9Dir()
    walker.display()
  }

  return


};
