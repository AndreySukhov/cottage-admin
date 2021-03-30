import React from 'react';
import ReactDOM from 'react-dom';

import {
  BrowserRouter as Router,
} from 'react-router-dom';

import AppContextRoot from './App';

require('dotenv').config();

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <AppContextRoot  />
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);
