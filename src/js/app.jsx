import React from 'react';
import {render} from 'react-dom';
import {AppContainer} from './container/AppContainer'
import {reduce} from './reducer/main'

import { createStore, applyMiddleware } from 'redux'
import { connect, Provider } from 'react-redux'
import thunk from 'redux-thunk';
const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);
const store = createStoreWithMiddleware(reduce);

render(
  <div>
    <Provider store={store}>
      <AppContainer />
    </Provider>
  </div>,
  document.getElementById('app')
);
