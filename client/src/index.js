import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';

import reducer from './reducers';

const createStoreWithMiddleware = applyMiddleware()(createStore);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={createStoreWithMiddleware(reducer)}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
