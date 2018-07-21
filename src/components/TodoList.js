import React from 'react';
import PropTypes from 'prop-types';
import Todo from './Todo';

const TodoList = ({ todos, toggleTodo }) => (
  <section className='main'>
    <input className='toggle-all'
           type='checkbox'
    />
    <ul className='todo-list'>
      { todos.map(todo => (
        <Todo
          key={ todo.id }
          {...todo}
          onClick={ () => toggleTodo(todo.id) } />
      )) }
    </ul>
  </section>
);

TodoList.propTypes = {
  todos: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      completed: PropTypes.bool.isRequired,
      text: PropTypes.string.isRequired
    }).isRequired
  ).isRequired,
  toggleTodo: PropTypes.func.isRequired
};

export default TodoList;
