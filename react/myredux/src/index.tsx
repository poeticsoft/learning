
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import mainReducer from './reducer/main';
import './index.scss';
import RootApp from './container/root';

import { 
  init,
  reset
} from './action/main'

const store = createStore(mainReducer)

ReactDOM.render(
  <Provider store={ store }>
    <RootApp />
  </Provider>, 
  document.getElementById('root')
);

setTimeout(function() {

  // Dispatch some actions
  
  store.dispatch(init('Init state'));  

  setTimeout(function() {

    // Dispatch some actions
    
    store.dispatch(reset('Reset state'));
  }, 2000);
}, 2000);
