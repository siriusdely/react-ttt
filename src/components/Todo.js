import React from 'react';
import PropTypes from 'prop-types';
import ClassNames from 'classnames';

const Todo = ({ onDelete, onToggle, completed, text }) => {
  return (
    <li
      className={ ClassNames({
          completed: completed
      }) }>
      <div className='view'>
        <input className='toggle'
               type='checkbox'
               checked={ completed }
               onChange={ onToggle }
        />
        <label>
          { text }
        </label>
        <button className='destroy' onClick={ onDelete } />
      </div>
    </li>
  );
};

Todo.propTypes = {
  onToggle: PropTypes.func.isRequired,
  completed: PropTypes.bool.isRequired,
  text: PropTypes.string.isRequired
};

export default Todo;
