import React, {Component} from 'react';
import p5 from 'p5'

export interface SketchProps {

  sketch: (p: p5) => void,
}

export class SketchComponent extends Component<SketchProps> {
  private p5Instance?: p5;

  componentDidMount() {

    console.log(this.props.sketch)
    // @ts-ignore

    this.p5Instance = new p5(this.props.sketch, 'canvas-container');

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

