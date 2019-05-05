import React from 'react';

import './App.css';
import {SketchComponent} from "./lib/SketchComponent";
import {recamanSketch} from "./sketches/recaman/recaman";

const App: React.FC = () => {

  return (
    <div className="App">
      <SketchComponent sketch={recamanSketch}/>
    </div>
  )
}

export default App
