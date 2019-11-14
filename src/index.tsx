import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

import {BrowserRouter as Router, Route} from "react-router-dom";
import {SketchComponent} from "./lib/SketchComponent";
import {RecamanSketchColor} from "./sketches/recaman/recamanColor";
import {RecamanSketch} from "./sketches/recaman/recaman";
import {RecamanSketchAnimated} from "./sketches/recaman/recamanAnimated";
import Hue from "./sketches/hue/Hue";
import {RecamanRandomSketch} from "./sketches/recaman/recaman-random";
import {RandomWalker} from "./sketches/natural-simulations/random-walker";


const AppRouter = () => (
  <Router>
    <Route exact path="/" component={App}/>
    <Route
      exact path="/sketches/recaman-basic"
      render={() => <SketchComponent sketch={RecamanSketch}/>}
    />
    <Route
      exact path="/sketches/recaman-random"
      render={() => <SketchComponent sketch={RecamanRandomSketch}/>}
    />
    <Route
      exact path="/sketches/recaman-color"
      render={() => <SketchComponent sketch={RecamanSketchColor}/>}
    />
    <Route
      exact path="/sketches/recaman-animated"
      render={() => <SketchComponent sketch={RecamanSketchAnimated}/>}
    />
    <Route
      exact path="/sketches/hue"
      render={() => <Hue/>}
    />
    <Route
      exact path="/sketches/natural-simulations/random-walker"
      render={() => <SketchComponent sketch={RandomWalker}/>}
    />
  </Router>
);

ReactDOM.render(<AppRouter/>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
