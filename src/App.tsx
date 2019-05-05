import React from 'react';
import p5 from 'p5'

import './App.css';
import {SketchWrapper} from './lib/Sketch'
import {Test, TestSketch} from "./sketches/test/TestSketch.tsx";

const App: React.FC = () => {

  const s = new TestSketch()
  return (
    <div className="App">

      <h1>Hello</h1>

      <SketchWrapper
        { ... Test}
      />
      <SketchWrapper setup={((p: p5) => {

      })} draw={(p: p5) => {

        p.ellipse(100, 100, 100, 100)
      }}/>

      <h1>goodbyte</h1>

    </div>
  );
}

export default App;
