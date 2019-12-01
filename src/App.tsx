import React from 'react';

import './App.css';
import {Link} from "react-router-dom";
import {classes, extend, stylesheet} from 'typestyle'
import {vertical} from "csstips";

const App: React.FC = () => {
  return (
    <div className={classes("app", css.main)}>
      <Link className={css.link} to="/sketches/recaman-basic">Basic Recaman</Link>
      <Link className={css.link} to="/sketches/recaman-random">random Recaman</Link>
      <Link className={css.link} to="/sketches/recaman-animated">Animated Recaman</Link>
      <Link className={css.link} to="/sketches/recaman-color">Color Recaman</Link>
      <Link className={css.link} to="/sketches/hue/hue">Hue</Link>
      <Link className={css.link} to="/sketches/natural-simulations/random-walker">Random walker</Link>
      <Link className={css.link} to="/sketches/screen-printing/hexagon-sketch">Hexagon sketch</Link>

      <Link className={css.link} to="/sketches/screen-printing/hexagon-multiple">Hexagon multiple  sketch</Link>
      <Link className={css.link} to="/sketches/hue/color-palette">Colour palette</Link>
      <Link className={css.link} to="/sketches/hue/pallete-with-picker">Colour palette with picket</Link>
    </div>
  )
}

export default App


const css = stylesheet({
  main: {
    ...extend(vertical)
  },
  link: {
    padding: 10
  }
})
