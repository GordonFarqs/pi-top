import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import 'css/global/app';
import 'css/global/header';

import App from 'components/App';
import store from 'ducks/store';

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>
  , document.getElementById('app'),
);
