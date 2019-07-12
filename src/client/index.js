import React from 'react';
import ReactDOM from 'react-dom';
// import {Provider} from 'react-redux';
// import App from './containers/App';

const root = document.getElementById('root');

//Connects react-redux's <Provider/> give <App/> access to redux store.
//Connect <App/> to DOM
/* ReactDOM.render(
  <Provider store={store}>
    <App/>
  </Provider>, root)
 */
ReactDOM.render(
  <h1>HELLO!</h1>, root)