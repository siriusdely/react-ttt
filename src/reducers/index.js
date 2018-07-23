import { combineReducers } from 'redux';
import {
  ADD_TODO,
  DELETE_TODO,
  REMOVE_COMPLETED_TODOS,
  SET_VISIBILITY_FILTER,
  TOGGLE_ALL_TODOS,
  TOGGLE_TODO,
  VisibilityFilters
} from '../actions/index';

const { SHOW_ALL }  = VisibilityFilters;

function visibilityFilter(state=SHOW_ALL, action) {
  switch (action.type) {
  case SET_VISIBILITY_FILTER:
    return action.filter;
  default:
    return state;
  }
}

function todos(state=[], action) {
  switch (action.type) {
  case ADD_TODO:
    return [
      ...state,
      {
        id: action.id,
        text: action.text,
        completed: false
      }
    ];
  case DELETE_TODO:
    return state.filter(todo => todo.id !== action.id);
  case REMOVE_COMPLETED_TODOS:
    return state.filter(todo => !todo.completed);
  case TOGGLE_ALL_TODOS:
    return state.map(t => ({ ...t, completed: action.completed }));
  case TOGGLE_TODO:
    return state.map(
      todo => (todo.id === action.id) ?
        { ...todo, completed: !todo.completed }
      : todo
    );
  default:
    return state;
  }
}

const todoApp = combineReducers({
  visibilityFilter,
  todos
});


export default todoApp;
