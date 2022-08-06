import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './index.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import '@fortawesome/fontawesome-free/js/all.min.js';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter} from 'react-router-dom';
import 'jquery/dist/jquery.min.js'
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <React.StrictMode>
     <App />
    </React.StrictMode>
  </BrowserRouter>
);

reportWebVitals();
