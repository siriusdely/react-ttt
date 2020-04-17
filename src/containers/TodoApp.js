import React from 'react';
import { Provider } from 'react-redux';
import 'todomvc-app-css/index.css';

import Footer from './Footer';
import AddTodo from '../containers/AddTodo';
import VisibleTodoList from '../containers/VisibleTodoList';
import store from '../store';

/*
import {
  addTodo,
  toggleTodo,
  setVisibilityFilter,
  VisibilityFilters
} from './actions';
*/

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

const TodoApp = () => (
  <Provider store={ store }>
    <section className='todoapp'>
      <div>
        <AddTodo />
        <VisibleTodoList />
        <Footer />
      </div>
    </section>
  </Provider>
);

export default TodoApp;
