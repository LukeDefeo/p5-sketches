import React, {PureComponent} from 'react';
// import * as Grid from 'react-css-grid'
import GridLayout from 'react-grid-layout';
import {SwatchesPicker, SwatchesPickerProps} from 'react-color';
import {stylesheet, extend} from 'typestyle'
import {horizontal, center, flex, vertical, centerJustified, centerCenter, content} from 'csstips'
import {random, bezier, scale, average} from 'chroma-js'


interface HueProps {

}

/**
 * do something with recursive quad trees
 *
 * e.g random depth of quad tree ness
 */
type Props = HueProps;

class Hue extends PureComponent<Props> {
  //
  topLeft = '#00429d'
  topRight = '#96ffea'
  bottomLeft = '#ffffe0'
  bottomRight = '#FBDCE3'

  // topLeft = 'green'
  // topRight = 'red'
  // bottomLeft = 'yellow'
  // bottomRight = 'blue'

  topPallete = bezier([this.topLeft, this.topRight]).scale().correctLightness(true)
  leftPallete = bezier([this.topLeft, this.bottomLeft]).scale().correctLightness(true)
  rightPallete = bezier([this.topRight, this.bottomRight]).scale().correctLightness(true)
  bottomPallete = bezier([this.bottomLeft, this.bottomRight]).scale().correctLightness(true)


  size = 10
  colors: string[][] = []

  constructor(props) {
    super(props)


    //init 2d
    for (let i = 0; i < this.size; i++) {
      this.colors[i] = []
    }

    //top row
    for (let i = 0; i < this.size; i++) {
      let color: string = this.topPallete(i / this.size).hex();
      this.colors[0][i] = color
    }

    //bottom row
    for (let i = 0; i < this.size; i++) {
      let color: string = this.bottomPallete(i / this.size).hex();
      this.colors[this.size - 1][i] = color
    }

    //left col
    for (let i = 0; i < this.size; i++) {
      let color: string = this.leftPallete(i / this.size).hex();
      this.colors[i][0] = color
    }

    //right col
    for (let i = 0; i < this.size; i++) {
      let color: string = this.rightPallete(i / this.size).hex();
      this.colors[i][this.size - 1] = color
    }

    for (let i = 1; i < this.size - 1; i++) {

      for (let j = 1; j < this.size - 1; j++) {

        const topColor = this.colors[0][j]
        const topWeight = 0.9 - (i / (this.size - 1))
        const bottomColor = this.colors[this.size - 1][j]
        const bottomWeight = i / (this.size -1)


        const leftColor = this.colors[i][0]
        const leftWeiht = 0.9 - (j / (this.size - 1))
        const rightColor = this.colors[i][this.size -1]
        const rightWeight = j / (this.size - 1)


        // console.log(`i${i},j${j} top ${topColor} ${topWeight} bottom ${bottomColor} ${bottomWeight} left ${leftColor} ${leftWeiht} right ${rightColor} ${rightWeight}`)

        console.log(`i${i},j${j} top  ${topWeight} bottom ${bottomWeight} left  ${leftWeiht} right ${rightWeight}`)


        // @ts-ignore
        this.colors[i][j] = average([topColor,bottomColor, leftColor, rightColor], 'rgb', [topWeight, bottomWeight, leftWeiht, rightWeight ])
      }

    }


  }

  private range(n
                  :
                  number
  ) {
    return Array.from(Array(n).keys());
  }

  private grid(size: number, numrows: number) {
    return <div className={css.grid}>
      {this.range(numrows).map(idx => this.row(size, numrows, idx))}
    </div>
  }

  private row(size: number, numRows: number, i: number) {
    // console.log(n)
    return (<div
      className={css.row}>
      {this.range(numRows).map(j => this.cell(size, i, j))}
    </div>)
  }


  private cell(size: number, i, j) {

    return <div
      style={{
        backgroundColor: this.colors[i][j],
        height: size,
        width: size
      }}>
    </div>;
  }

  render() {

    return (
      <div className={css.container}>
        {this.grid(50, this.size)}
      </div>
    )
  }
}

export default Hue;

const
  css = stylesheet({
    container: {
      // height: 'fill-parent',
      height: '100%',
      ...extend(vertical, centerCenter)
    },
    grid: {
      ...extend(vertical, content)
    },
    row: {
      ...extend(content, horizontal)
    }


  })
