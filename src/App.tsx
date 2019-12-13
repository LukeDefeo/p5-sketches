import React from 'react';

import './App.css';
import {Link} from "react-router-dom";
import {classes, extend, stylesheet} from 'typestyle'
import {vertical} from "csstips";
import {pages} from "./pages";

const App: React.FC = () => {
  return (
    <div className={classes("app", css.main)}>
      {pages.map(({path}) =>
        <Link className={css.link} to={path}>
          {path}
        </Link>
      )}
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
