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
      <Link to="/sketches/recaman-animated">Animated Recaman</Link>
      <Link to="/sketches/recaman-color">Color Recaman</Link>
    </div>
  )
}

export default App
