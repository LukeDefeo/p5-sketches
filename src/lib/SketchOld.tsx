import React, {Component} from 'react';
import p5 from 'p5'

export interface SketchProps {

  setup(p: p5): void;

  draw(p: p5): void;

}

export class SketchWrapperOld extends Component<SketchProps> {
  private p5Instance?: p5;

  componentDidMount() {

    const sketch1 = (p: p5) => {

      p.preload = () => {

      }

      p.setup = () => {
        p.createCanvas(p.windowWidth, p.windowHeight);
        this.props.setup(p)
      }

      p.windowResized = () => {
        p.resizeCanvas(p.windowWidth, p.windowHeight);
      }

      p.draw = () => {
        this.props.draw(p);
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
        <h1>Canvas End</h1>
        <div
          id="canvas-container"
          style={{width: "100%", textAlign: "center"}}
        />
        <h1>Canvas End</h1>
      </div>
    )
  }
}

