import p5Instance from "p5";
import {bezier, scale} from 'chroma-js'
import {SketchComponent} from "../../lib/SketchComponent";

// import{} from 'color'
import React, {PureComponent, useState} from 'react';
import {SwatchesPicker, SwatchesPickerProps} from 'react-color';
import {extend, stylesheet} from "typestyle";
import {centerCenter, content, horizontal, vertical} from "csstips";


export const ColourPalette = (colors: string[]) => (p: p5Instance) => {

  p.setup = () => {
    p.createCanvas(p.windowWidth * 0.95, p.windowHeight * 0.95);
    p.frameRate(10)


  }

  p.draw = () => {

    // console.log('drawing ', color)
    // console.log("setting up")
    const colours = ['#00429d', '#2e59a8', '#4771b2', '#5d8abd', '#73a2c6', '#8abccf', '#a5d5d8', '#c5eddf', '#ffffe0']

    const cols =
      bezier(colors)
        .scale().correctLightness(true)

    // const cols = scale('blue')
    //     .colors(10)



    p.noStroke()
    p.translate(100, 100)
    for (let i = 0; i < 10; i++) {
      let [r, g, b] = cols(i == 0 ? i : i / 10).rgb(false);
      // let [r, g, b] = cols[i].rgb(false);

      p.fill(r, g, b)
      p.translate(40, 0)
      p.rect(0, 0, 40, 40)
    }

  }
}

const Picker = (props) => {
  const [showPicker, setShowPicker] = useState(false)

  return (<div>
      <button onClick={() => setShowPicker(!showPicker)}> pick me</button>
      {showPicker ? <SwatchesPicker onChange={(picked) => {
        props.picked(picked.hex)

      }}/> : null}
    </div>
  )
}

export const PalleteWithPicker = () => {

  const colors: string[] = ['red', 'blue','orange']
  // const [showPicker, setShowPicker] = useState(false)
  // const [color, setColor] = useState('blue')

  return (<div >
      <Picker  picked={(color) => (colors[0] = color)}/>
      <Picker  picked={(color) => (colors[1] = color)}/>
      <Picker  picked={(color) => (colors[2] = color)}/>

      {/*<button onClick={() => setShowPicker(!showPicker)}> pick me</button>*/}
      {/*{showPicker ? <SwatchesPicker onChange={(picked) => {*/}
      {/*  colors.push(picked.hex)*/}
      {/*  // setShowPicker(false)*/}
      {/*}}/> : null}*/}
      <SketchComponent sketch={ColourPalette(colors)}/>

    </div>
  )
}

const css = stylesheet({
  container: {
    // height: 'fill-parent',
    height: '100%',
    ...extend(vertical,centerCenter)
  },
  grid: {
    ...extend(vertical, content)
  },
  row: {
    ...extend(content, horizontal)
  }


})
