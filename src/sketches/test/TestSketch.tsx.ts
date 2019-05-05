import {SketchProps} from "../../lib/Sketch";
import p5 from "p5"


export class TestSketch implements SketchProps {

  draw(p: p5): void {

    p.line(100, 100, 100, 100)
  }

  setup(p: p5): void {
  }

}

export const Test = {

  draw: (p: p5) => {
    p.ellipse(200, 100, 100, 100)

  },

  setup: (p: p5) => {

  }
}