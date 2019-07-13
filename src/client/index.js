import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import App from './components/App';
import store from '../client/store';

const root = document.getElementById('root');

ReactDOM.render(
  <Provider store={store}>
    <App/>
  </Provider>
  , root)