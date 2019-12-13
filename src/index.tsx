import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

import {BrowserRouter as Router, Route} from "react-router-dom";
import {pages} from "./pages";

const AppRouter = () => (
  <Router>
    <Route exact path="/" component={App}/>
    {pages.map(({path, component}) => <Route exact path={path} render={() => component}/>)}
  </Router>
);

ReactDOM.render(<AppRouter/>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
