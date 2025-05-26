import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import axios from "axios";
import axiosConfig from './api/axiosConfig.json'

axios.defaults.baseURL = axiosConfig.baseURL;

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
