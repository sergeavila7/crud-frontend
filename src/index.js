import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Axios from 'axios';

Axios.defaults.baseURL = 'http://localhost:4000'

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
