import React, {Component} from 'react';
import p5 from 'p5'


export interface Sketch {

  draw(p: p5): void

  setup(p: p5): void
}

export abstract class StaticSketch implements Sketch {

  draw(p: p5): void {
    //nothing
  }

  abstract setup(p: p5): void;

}

export interface SketchClassProps {

  sketchClass: Sketch,
}

//todo need to figure out how to set canva size based on parent divs sizing
//for now size is set in the sketch itself
export class SketchComponentClass extends Component<SketchClassProps> {
  private p5Instance?: p5;


  componentDidMount() {

    const sketch1 = (p: p5) => {

      p.preload = () => {

      }

      p.setup = () => {
        p.createCanvas(p.windowWidth, p.windowHeight);
        this.props.sketchClass.setup(p)
      }

      p.windowResized = () => {
        p.resizeCanvas(p.windowWidth, p.windowHeight);
      }

      p.draw = () => {
        this.props.sketchClass.draw(p);
      }

    };

    // @ts-ignore
    this.p5Instance = new p5(sketch1, 'canvas-container');

    console.log(this.p5Instance)
  }

  // shouldComponentUpdate(nextProps) {
  //   this.canvas1.props = nextProps.p5Props
  //   this.canvas2.props = nextProps.p5Props
  //   return false
  // }

  componentWillUnmount() {
    this.p5Instance!.remove()
  }

  render() {
    return (
      <div>
        <div
          id="canvas-container"
          style={{width: "100%", textAlign: "center"}}
        />
      </div>
    )
  }
}

