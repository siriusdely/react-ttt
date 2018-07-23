/**
  *  ACTION TYPES
  */

export const ADD_TODO = 'ADD_TODO';
export const DELETE_TODO = 'DELETE_TODO';
export const REMOVE_COMPLETED_TODOS = 'REMOVE_COMPLETED_TODOS';
export const SET_VISIBILITY_FILTER = 'SET_VISIBILITY_FILTER';
export const TOGGLE_ALL_TODOS = 'TOGGLE_ALL_TODOS';
export const TOGGLE_TODO = 'TOGGLE_TODO';

/**
  * OTHER CONSTANTS
  */

export const VisibilityFilters = {
  SHOW_ALL: 'SHOW_ALL',
  SHOW_COMPLETED: 'SHOW_COMPLETED',
  SHOW_ACTIVE: 'SHOW_ACTIVE'
};

/**
  * ACTION CREATORS
  */

let nextTodoId = 0;
export function addTodo(text) {
  return {
    type: ADD_TODO,
    id: nextTodoId++,
    text
  };
};

export function deleteTodo(id) {
  return { type: DELETE_TODO, id };
};

export function toggleAllTodos(completed) {
  return { type: TOGGLE_ALL_TODOS, completed };
};

export function toggleTodo(id) {
  return { type: TOGGLE_TODO, id };
};

export function removeCompletedTodos() {
  return { type: REMOVE_COMPLETED_TODOS };
}

export function setVisibilityFilter(filter) {
  return { type: SET_VISIBILITY_FILTER, filter };
};
