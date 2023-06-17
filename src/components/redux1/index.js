import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App(redux1)';
import reportWebVitals from './reportWebVitals';
//import { configureStore } from '@reduxjs/toolkit';
import allReducers from './components/reduxo/AllReducers';
import { Provider, createStoreHook } from 'react-redux';

//const store = configureStore(allReducers);
const store = createStoreHook(allReducers);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
    <App />
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();