import 'babel-polyfill';

import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import { createStore, applyMiddleware } from 'redux';
import { selectSubreddit, fetchPosts, fetchPostsIfNeeded } from './actions.js';
import rootReducer from './reducers.js';

const loggerMiddleware = createLogger();

const store = createStore(
  rootReducer,
  applyMiddleware(
    thunkMiddleware, // let us dispatch() functions
    loggerMiddleware, // neat middleware that logs actions
  )
);

store.dispatch(selectSubreddit('reactjs'));
store
  .dispatch(fetchPostsIfNeeded('reactjs'))
  .then(() => console.log(store.getState()));
