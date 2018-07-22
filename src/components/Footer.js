import React from 'react';
import { connect } from 'react-redux';

import FilterLink from '../containers/FilterLink';
import { VisibilityFilters } from '../actions/index';
import Utils from '../utils';

let Footer = ({ count }) => {
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
    </footer>
  )
};

const getCount = (todos) => {
  return todos.reduce(function(accum, todo) {
    return todo.completed ? accum : accum + 1;
  }, 0);
}

const mapStateToProps = state => {
  return {
    count: getCount(state.todos)
  };
};

Footer = connect(mapStateToProps)(Footer);

export default Footer;

