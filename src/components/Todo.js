import React from 'react';
import PropTypes from 'prop-types';
import ClassNames from 'classnames';

const Todo = ({ onClick, completed, text }) => {
  return (
    <li
      className={ ClassNames({
          completed: completed
      }) }>
      <div className='view'>
        <input className='toggle'
               type='checkbox'
               checked={ completed }
               onChange={ onClick }
        />
        <label>
          { text }
        </label>
      </div>
    </li>
  );
};

Todo.propTypes = {
  onClick: PropTypes.func.isRequired,
  completed: PropTypes.bool.isRequired,
  text: PropTypes.string.isRequired
};

export default Todo;
