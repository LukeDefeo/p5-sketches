import React from 'react';

import './App.css';
import {SketchComponent} from "./lib/SketchComponent";
// import {RecamanSketchAnimated} from "./sketches/recaman/recaman";
import {RecamanSketchAnimated} from "./sketches/recaman/recamanAnimated";
import {testSketch} from "./sketches/test/TestSketch";
import {RecamanSketchColor} from "./sketches/recaman/recamanColor";
import {Route, Router} from "react-router";
import {Link} from "react-router-dom";

const App: React.FC = () => {
  return (
    <div className="App">
      <Link to="/sketches/recaman-basic">Basic Recaman</Link>
      <Link to="/sketches/recaman-random">random Recaman</Link>
      <Link to="/sketches/recaman-animated">Animated Recaman</Link>
      <Link to="/sketches/recaman-color">Color Recaman</Link>
      <Link to="/sketches/hue">Hue</Link>
      <Link to="/sketches/natural-simulations/random-walker">Random walker</Link>
      <Link to="/sketches/screen-printing/hexagon-sketch">Hexagon sketch</Link>

      <Link to="/sketches/screen-printing/hexagon-multiple">Hexagon multiple  sketch</Link>
    </div>
  )
}

export default App
