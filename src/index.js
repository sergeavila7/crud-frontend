import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Axios from 'axios';

Axios.defaults.baseURL = process.env.REACT_APP_BACKEND_URL;

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
