import React from 'react';
import ReactDOM from 'react-dom';
import AppContextRoot from './App';

require('dotenv').config();

ReactDOM.render(
  <React.StrictMode>
    <AppContextRoot />
  </React.StrictMode>,
  document.getElementById('root')
);
