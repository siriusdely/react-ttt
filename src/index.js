import React from 'react';
import { render } from 'react-dom';
import { Provider} from 'react-redux';
/*
import {
  addTodo,
  toggleTodo,
  setVisibilityFilter,
  VisibilityFilters
} from './actions';
*/
import App from './components/App';
import store from './store';

// Log the initial state
console.log(store.getState());

// Every time the state changes, log it
// Note that subscribe() returns a function for unregistering the listener
const unsubscribe = store.subscribe(() =>
  console.log(store.getState())
);

// Dispatch some actions
/*
store.dispatch(addTodo('Learn about actions'));
store.dispatch(addTodo('Learn about reducers'));
store.dispatch(addTodo('Learn about store'));
store.dispatch(toggleTodo(0));
store.dispatch(toggleTodo(1));
// store.dispatch(setVisibilityFilter(VisibilityFilters.SHOW_COMPLETED));
*/

// Stop listening to state updates
unsubscribe();

render(
  <Provider store={ store }>
    <App />
  </Provider>,
  document.getElementById('root')
);
