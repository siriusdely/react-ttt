import 'babel-polyfill';

import configureStore from './configureStore.js';
import { selectSubreddit, fetchPosts, fetchPostsIfNeeded } from './actions.js';

const store = configureStore();

store.dispatch(selectSubreddit('reactjs'));
store
  .dispatch(fetchPostsIfNeeded('reactjs'))
  .then(() => console.log(store.getState()));
