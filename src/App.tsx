import React from 'react';

import './App.css';
import {SketchComponent} from "./lib/SketchComponent";
// import {recamanSketchAnimated} from "./sketches/recaman/recaman";
import {recamanSketchAnimated} from "./sketches/recaman/recamanAnimated";
import {testSketch} from "./sketches/test/TestSketch";
import {recamanSketchColor} from "./sketches/recaman/recamanColor";

const App: React.FC = () => {
  return (
    <div className="App">
      <SketchComponent sketch={recamanSketchColor}/>
    </div>
  )
}

export default App
