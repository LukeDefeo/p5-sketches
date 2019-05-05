import React from 'react';

import './App.css';
import {SketchComponent} from "./lib/SketchComponent";
// import {recamanSketchAnimated} from "./sketches/recaman/recaman";
import {recamanSketchAnimated} from "./sketches/recaman/recamanAnimated";

const App: React.FC = () => {

  return (
    <div className="App">
      <SketchComponent sketch={recamanSketchAnimated}/>
    </div>
  )
}

export default App
