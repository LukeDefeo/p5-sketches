import React from 'react';

import './App.css';
import {testSketch} from "./sketches/test/TestSketch";
import {SketchComponent} from "./lib/SketchComponent";

const App: React.FC = () => {

  return (
    <div className="App">
      <SketchComponent sketch={testSketch}/>
    </div>
  )
}

export default App
