import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import '@radix-ui/themes/styles.css';
import ReactGA from 'react-ga';

if (process.env.NODE_ENV === 'production') {
  ReactGA.initialize(process.env.REACT_APP_GA_TRACKING_ID);
}
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
