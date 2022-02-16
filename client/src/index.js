/**
 * Imports
 */
// React DOM
import React from 'react';
import ReactDOM from 'react-dom';
// Redux
import { Provider } from 'react-redux';
import store from './store';
// Components
import App from './App';
// Web Vitals
import reportWebVitals from './reportWebVitals';
// Service Worker
import * as serviceWorkerRegistration from './serviceWorkerRegistration';

/**
 * Render
 */
ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

/**
 * Register Service Worker and Report Web Vitals
 */
serviceWorkerRegistration.register();
reportWebVitals();
