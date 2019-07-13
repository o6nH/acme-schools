import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import App from './components/App';
import store from '../client/store';

const root = document.getElementById('root');

//Connects react-redux's <Provider/> give <App/> access to redux store.
//Connect <App/> to DOM
ReactDOM.render(
  <Provider store={store}>
    <h1>Hello from ReactDOM render ({`${__filename}`})</h1>
    <App/>
  </Provider>
  , root)