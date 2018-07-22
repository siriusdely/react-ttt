import React, { Component } from 'react';
import { Provider } from 'react-redux';
import configureStore from '../configureStore';
import AsyncApp from './AsyncApp';

// import { selectSubreddit, fetchPosts, fetchPostsIfNeeded } from '../actions.js';

const store = configureStore();
/*
store.dispatch(selectSubreddit('reactjs'));
store
  .dispatch(fetchPostsIfNeeded('reactjs'))
  .then(() => console.log(store.getState()));
*/
export default class Root extends Component {
  render() {
    return (
      <Provider store={ store }>
        <AsyncApp />
      </Provider>
    );
  }
}
