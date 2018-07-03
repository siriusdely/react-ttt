import React, { Component } from 'react';
import ReactDom from 'react-dom';

// import 'todomvc-common/base.css';
import 'todomvc-app-css/index.css';

// import 'todomvc-common/base.js';

import Model from './model';

class TodoItem extends Component {
  render() {
    return (
      <li>
        <div className='view'>
          <input className='toggle'
                 type='checkbox' />
          <label>
            Single Todo Title
          </label>
          <button className='destroy' />
        </div>
        <input ref='editField'
               className='edit' />
      </li>
    );
  }
}

class TodoApp extends Component {

  constructor(props) {
    super(props);
    this.state = {
      editing: null,
      newTodo: ''
    };
  }

  render() {
    var main;
    var todos = this.props.model.todos;
    console.log(JSON.stringify(todos));

    var todoItems = todos.map(function(todo) {
      return (
        <TodoItem key={ todo.id }
                  todo={ todo } />
      );
    }, this);

    if (todos.length) {
      main = (
        <section className='main'> 
          <input className='toggle-all'
                 type='checkbox' />
          <ul className='todo-list'>
            { todoItems }
          </ul>
        </section>
      );
    }

    return (
      <section className='todoapp'>
        <div>
          <header className='header'>
            <h1>todos</h1>
            <input className='new-todo'
                   placeholder='What needs to be done?'
                   autoFocus={ true } />
          </header>
          { main }
        </div>
      </section>
    );
  }
}

const model = new Model('react-todos');

ReactDom.render(<TodoApp model={ model } />, document.getElementById('root'));
