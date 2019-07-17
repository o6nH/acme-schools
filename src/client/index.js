import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import App from './components/App';
import store from '../client/store';
import '../public/style.css'; //import custom css with loaders to adjust bootstrap

const root = document.getElementById('root');

ReactDOM.render(
  <Provider store={store}>
    <App/>
  </Provider>
  , root)