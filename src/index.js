import React, { Component } from 'react';
import ReactDom from 'react-dom';
import { Router } from 'director/build/director'
import ClassNames from 'classnames';

// import 'todomvc-common/base.css';
import 'todomvc-app-css/index.css';

// import 'todomvc-common/base.js';

import Model from './model';
import Utils from './utils';

// var Director = require('director/build/director');
// var Router = Director.Router;

class TodoItem extends Component {
  render() {
    return (
      <li>
        <div className='view'>
          <input className='toggle'
                 type='checkbox' />
          <label>
            { this.props.todo.title }
          </label>
          <button className='destroy' />
        </div>
        <input ref='editField'
               className='edit' />
      </li>
    );
  }
}

class Footer extends Component {
  render() {
    var clearButton = null;
    if (this.props.completedCount > 0) {
      clearButton = (
        <button className='clear-completed'>
          Clear completed
        </button>
      );
    }

    var activeTodoWording = Utils.pluralize(this.props.count, 'item');
    var nowShowing = this.props.nowShowing;

    return (
      <footer className='footer'>
        <span className='todo-count'>
          <strong>{ this.props.count }</strong> { activeTodoWording } left
        </span>
        <ul className='filters'>
          <li><a href='#/'
                 className={ ClassNames({ selected: nowShowing === ALL_TODOS }) }>
            All
          </a></li>
          <li><a href='#/active'
                 className={ ClassNames({ selected: nowShowing === ACTIVE_TODOS }) }>
            Active
          </a></li>
          <li><a href='#/completed'
                 className={ ClassNames({ selected: nowShowing === COMPLETED_TODOS }) }>
            Completed
          </a></li>
        </ul>
      </footer>
    );
  }
}

const ALL_TODOS = 'ALL_TODOS';
const ACTIVE_TODOS = 'ACTIVE_TODOS';
const COMPLETED_TODOS = 'COMPLETED_TODOS';

class TodoApp extends Component {

  ENTER_KEY = 13;

  constructor(props) {
    super(props);
    this.state = {
      nowShowing: ALL_TODOS,
      editing: null,
      newTodo: ''
    };
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    var setState = this.setState;
    var routes = {
      '/': setState.bind(this, { nowShowing: ALL_TODOS }),
      '/active': setState.bind(this, { nowShowing: ACTIVE_TODOS }),
      '/completed': setState.bind(this, { nowShowing: COMPLETED_TODOS })
    };
    var router = Router(routes);
    router.init('/');
  }

  handleChange(e) {
    this.setState({
      newTodo: e.target.value
    });
  }

  handleNewTodoKeyDown(e) {
    if (e.keyCode !== this.ENTER_KEY) { return; }
    e.preventDefault();

    const val = this.state.newTodo.trim();

    if (val) {
      this.props.model.addTodo(val);
      this.setState({ newTodo: ''});
    }
  }

  render() {
    var todos = this.props.model.todos;
    // this.props.model.addTodo('Single Todo Title');
    // console.log(JSON.stringify(todos));

    var todoItems = todos.map(function(todo) {
      return (
        <TodoItem key={ todo.id }
                  todo={ todo } />
      );
    }, this);

    var main;
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

    var activeTodoCount = todos.reduce(function(accum, todo) {
      return todo.completed ? accum : accum + 1;
    }, 0);
    var completedCount = todos.length = activeTodoCount;

    var footer;
    if (activeTodoCount || completedCount) {
      footer = (
        <Footer count={ activeTodoCount }
                completedCount={ completedCount }
                nowShowing={ this.state.nowShowing } />
      );
    }

    return (
      <section className='todoapp'>
        <div>
          <header className='header'>
            <h1>todos</h1>
            <input className='new-todo'
                   placeholder='What needs to be done?'
                   value={ this.state.newTodo }
                   onChange={ this.handleChange }
                   onKeyDown={ this.handleNewTodoKeyDown.bind(this) }
                   autoFocus={ true } />
          </header>
          { main }
          { footer }
        </div>
      </section>
    );
  }
}

const model = new Model('react-todos');

ReactDom.render(<TodoApp model={ model } />, document.getElementById('root'));
