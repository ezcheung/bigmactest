import ReactDOM from 'react-dom';

import React from 'react';
import App from './components/app.js';
import { BrowserRouter, Route } from 'react-router-dom'

/**
* The routes
* NB: /plain disables style sheets
*/
ReactDOM.render((
  <BrowserRouter>
  	<Route path="/" component={App}/>
  </BrowserRouter>),
  document.getElementById('app'));