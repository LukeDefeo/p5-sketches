import {SketchComponent} from "./lib/SketchComponent";
import {RecamanSketch} from "./sketches/recaman/recaman";
import {RecamanRandomSketch} from "./sketches/recaman/recaman-random";
import {RecamanSketchColor} from "./sketches/recaman/recamanColor";
import {RecamanSketchAnimated} from "./sketches/recaman/recamanAnimated";
import Hue from "./sketches/hue/Hue";
import {ColourPalette, PalleteWithPicker} from "./sketches/hue/Palette";
import {HexagonSketch} from "./sketches/screenprinting/hexagon";
import {HexagonMultipleSketch} from "./sketches/screenprinting/hexagonMultiple";
import {RandomWalker} from "./sketches/natural-simulations/random-walker";
import React from "react";
import {RecursiveChristmasSketch} from "./sketches/fractals/christmas";
import {Balls} from "./sketches/particles/balls";
import {SketchComponentClass} from "./lib/SketchComponentClass";

export const pages = [
  {
    path: "/sketches/recaman-basic",
    component: <SketchComponent sketch={RecamanSketch}/>
  }, {
    path: "/sketches/recaman-random",
    component: <SketchComponent sketch={RecamanRandomSketch}/>
  }, {
    path: "/sketches/recaman-color",
    component: <SketchComponent sketch={RecamanSketchColor}/>
  }, {
    path: "/sketches/recaman-animated",
    component: <SketchComponent sketch={RecamanSketchAnimated}/>
  }, {
    path: "/sketches/hue/hue",
    component: <Hue/>
  }, {
    path: "/sketches/hue/pallete-with-picker",
    component: <PalleteWithPicker/>
  }, {
    path: "/sketches/hue/color-palette",
    component: <SketchComponent sketch={ColourPalette(['blue'])}/>
  }, {
    path: "/sketches/screen-printing/hexagon-sketch",
    component: <SketchComponent sketch={HexagonSketch}/>
  },{
    path: "/sketches/fractals/christmas-tree",
    component: <SketchComponent sketch={RecursiveChristmasSketch}/>
  }, {
    path: "/sketches/screen-printing/hexagon-multiple",
    component: <SketchComponent sketch={HexagonMultipleSketch}/>
  }, {
    path: "/sketches/natural-simulations/random-walker",
    component: <SketchComponent sketch={RandomWalker}/>
  },
  {
    path: "/sketches/particles/balls",
    component: <SketchComponentClass sketchClass={new Balls()}/>
  },
]
