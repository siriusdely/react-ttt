import 'babel-polyfill';

import React from 'react';
import { render } from 'react-dom';
import TodoApp from './components/TodoApp';
// import Root from './containers/Root'

render(
  <TodoApp />,
  // <Root />,
  document.getElementById('root')
);
