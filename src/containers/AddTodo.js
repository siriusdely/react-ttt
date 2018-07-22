import React from 'react';
import { connect } from 'react-redux';
import { addTodo } from '../actions/index';

let AddTodo = ({ dispatch }) => {
  let input;

  return (
    <header className='header'>
      <h1>todos</h1>
      <input
        className='new-todo'
        placeholder='What needs to be done?'
        ref={ node => {
            input = node;
        } }
        onKeyDown={ e => {
            if (e.keyCode !== 13) { return; } // ENTER_KEY
            e.preventDefault();
            if (!input.value.trim()) { return; }
            dispatch(addTodo(input.value));
            input.value = '';
        } }
      />
    </header>
  );
};

AddTodo = connect()(AddTodo);

export default AddTodo;
