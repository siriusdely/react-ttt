import React from 'react';
import { connect } from 'react-redux';

import { removeCompletedTodos,
         VisibilityFilters } from '../actions/index';
import FilterLink from '../containers/FilterLink';
import Utils from '../utils';

let Footer = ({ count, hidden, clearButtonHidden, clearCompletedTodos }) => {
  if (hidden) return null;

  let clearButton = null;
  if (!clearButtonHidden) {
    clearButton = (
      <button
        className='clear-completed'
        onClick={ clearCompletedTodos }>
        Clear completed
      </button>
    );
  }

  const activeTodoWording = Utils.pluralize(count, 'item');
  return (
    <footer className='footer'>
      <span className='todo-count'>
        <strong>{ count }</strong> { activeTodoWording } left
      </span>
      <ul className='filters'>
        <li><FilterLink filter={ VisibilityFilters.SHOW_ALL }>
          All
        </FilterLink></li>
        <li><FilterLink filter={ VisibilityFilters.SHOW_ACTIVE }>
          Active
        </FilterLink></li>
        <li><FilterLink filter={ VisibilityFilters.SHOW_COMPLETED }>
          Completed
        </FilterLink></li>
      </ul>
      { clearButton }
    </footer>
  )
};

const getCount = (todos) => {
  return todos.reduce(function(accum, todo) {
    return todo.completed ? accum : accum + 1;
  }, 0);
}

const isHidden = todos => todos.length === 0;

const mapStateToProps = state => {
  const todos = state.todos;
  return {
    count: getCount(todos),
    clearButtonHidden: todos.length !== 0 && (todos.length - getCount(todos)) === 0,
    hidden: isHidden(todos)
  };
};

const mapDispatchToProps = dispatch => ({
  clearCompletedTodos: () => dispatch(removeCompletedTodos())
});

Footer = connect(mapStateToProps, mapDispatchToProps)(Footer);

export default Footer;

