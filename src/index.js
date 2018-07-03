import React, { Component } from 'react';
import ReactDom from 'react-dom';

// import 'todomvc-common/base.css';
import 'todomvc-app-css/index.css';

// import 'todomvc-common/base.js';

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
  render() {
    return (
      <section className='todoapp'>
        <div>
          <header className='header'>
            <h1>todos</h1>
            <input className='new-todo'
                   placeholder='What needs to be done?'
                   autoFocus={ true } />
            <section className='main'>
              <input className='toggle-all'
                     type='checkbox' />
              <ul className='todo-list'>
                <TodoItem />
                <TodoItem />
                <TodoItem />
              </ul>
            </section>
          </header>
        </div>
      </section>
    );
  }
}

ReactDom.render(<TodoApp />, document.getElementById('root'));
