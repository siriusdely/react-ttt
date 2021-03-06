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
  constructor(props) {
    super(props);
    this.state = { editText: props.todo.title, dragged: false }
  }

	/**
	 * This is a completely optional performance enhancement that you can
	 * implement on any React component. If you were to delete this method
	 * the app would still work correctly (and still be very performant!), we
	 * just use it as an example of how little code it takes to get an order
	 * of magnitude performance improvement.
	 */
  shouldComponentUpdate(nextProps, nextState) {
    // console.log('shouldComponentUpdate');
    return (
      nextProps.todo !== this.props.todo ||
      nextProps.editing !== this.props.editing ||
      nextState.editText !== this.state.editText
      || nextState.dragged !== this.state.dragged
    );
  }

  /**
   * Safely manipulate the DOM after updating the state when invoking
	 * `this.props.onEdit()` in the `handleEdit` method below.
	 * For more info refer to notes at https://facebook.github.io/react/docs/component-api.html#setstate
	 * and https://facebook.github.io/react/docs/component-specs.html#updating-componentdidupdate
	 */
  componentDidUpdate(prevProps) {
    // console.log('componentDidUpdate');
    if (!prevProps.editing && this.props.editing) {
      var node = ReactDom.findDOMNode(this.refs.editField);
      node.focus();
      node.setSelectionRange(node.value.length, node.value.length);
    }
  }

  handleEdit() {
    this.props.onEdit();
    this.setState({ editText: this.props.todo.title });
  }

  handleChange(e) {
    if (this.props.editing) {
      this.setState({ editText: e.target.value });
    }
  }

  handleSubmit(e) {
    var val = this.state.editText.trim();
    if (val) {
      this.props.onSave(val);
      this.setState({ editText: val });
    } else {
      this.props.onDestroy();
    }
  }

  handleKeyDown(e) {
    if (e.which === ESCAPE_KEY) {
      this.setState({ editText: this.props.todo.title });
      this.props.onCancel(e);
    } else if (e.which === ENTER_KEY) {
      this.handleSubmit(e);
    }
  }

  handleDragStart = (e) => {
    // console.log('handleDragStart', e.target.id);
    // e.dataTransfer.effectAllowed = 'move';
    // e.dataTransfer.dropEffect = 'move';
    e.dataTransfer.setData('text', e.target.id);
    this.setState({ dragged: true });
  }

  handleDragOver = (e) => {
    e.preventDefault();
    // e.dataTransfer.dropEffect = 'move';
  }

  handleDrop = (e) => {
    // console.log('handleDrop', e.target);
    // e.persist();
    // console.log('handleDrop', e.nativeEvent);
    // console.log('handleDrop', e.currentTarget);
    const targetId = e.dataTransfer.getData('text', e.target.id);
    var currentTargetId = e.currentTarget.id;
    // console.log('handleDrop', targetId, currentTargetId);

    if (currentTargetId && targetId !== currentTargetId) {
      // console.log('targetId', targetId);
      this.props.onSwap(targetId, currentTargetId);
    }
    e.dataTransfer.clearData();
  }

  handleDragEnd = (e) => {
    // console.log('handleDragEnd', e.target.id);
    this.setState({
      dragged: false,
      // editText: ''
    });
  }

  render() {
    return (
      <li draggable id={ this.props.todo.id }
          onDragStart={ this.handleDragStart }
          onDragOver={ this.handleDragOver }
          onDrop={ this.handleDrop }
          onDragEnd={ this.handleDragEnd }
          className={ ClassNames({
              completed: this.props.todo.completed,
              editing: this.props.editing
          }) }>
        <div className='view'>
          <input className='toggle'
                 type='checkbox'
                 checked={ this.props.todo.completed }
                 onChange={ this.props.onToggle } />
          <label onDoubleClick={ this.handleEdit.bind(this) }>
            { this.props.todo.title }
          </label>
          <button className='destroy' onClick={ this.props.onDestroy } />
        </div>
        <input ref='editField'
               className='edit'
               value={ this.state.editText }
               onChange={ this.handleChange.bind(this) }
               onKeyDown={ this.handleKeyDown.bind(this) }
               onBlur={ this.handleSubmit.bind(this) }
        />
      </li>
    );
  }
}

class Footer extends Component {
  render() {
    var clearButton = null;
    if (this.props.completedCount > 0) {
      clearButton = (
        <button className='clear-completed'
                onClick={ this.props.onClearCompleted }>
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
        { clearButton }
      </footer>
    );
  }
}

const ALL_TODOS = 'ALL_TODOS';
const ACTIVE_TODOS = 'ACTIVE_TODOS';
const COMPLETED_TODOS = 'COMPLETED_TODOS';

const ENTER_KEY = 13;
const ESCAPE_KEY = 27;

class TodoApp extends Component {

  constructor(props) {
    super(props);
    this.state = {
      nowShowing: ALL_TODOS,
      editing: null,
      newTodo: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.clearCompleted = this.clearCompleted.bind(this);
    this.cancel = this.cancel.bind(this);
    this.swap = this.swap.bind(this);
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
    if (e.keyCode !== ENTER_KEY) { return; }
    e.preventDefault();

    const val = this.state.newTodo.trim();
    if (val) {
      this.props.model.addTodo(val);
      this.setState({ newTodo: ''});
    }
  }

  toggle(todo) {
    this.props.model.toggle(todo);
  }

  destroy(todo) {
    this.props.model.destroy(todo);
  }

  edit(todo) {
    this.setState({ editing: todo.id });
  }

  save(todo, title) {
    this.props.model.save(todo, title);
    this.setState({ editing: null });
  }

  cancel() {
    this.setState({ editing: null });
  }

  toggleAll(e) {
    var checked = e.target.checked;
    this.props.model.toggleAll(checked);
  }

  clearCompleted() {
    this.props.model.clearCompleted();
  }

  swap(todoId, withTodoId) {
    this.props.model.swap(todoId, withTodoId);
  }

  render() {
    var todos = this.props.model.todos;
    // this.props.model.addTodo('Single Todo Title');
    // console.log(JSON.stringify(todos));
    var shownTodos = todos.filter(function(todo) {
      switch(this.state.nowShowing) {
        case ACTIVE_TODOS:
          return !todo.completed;
        case COMPLETED_TODOS:
          return todo.completed;
        default:
          return true;
      }
    }, this);

    var todoItems = shownTodos.map(function(todo) {
      return (
        <TodoItem key={ todo.id }
                  todo={ todo }
                  onToggle={ this.toggle.bind(this, todo) }
                  onDestroy={ this.destroy.bind(this, todo) }
                  onEdit={ this.edit.bind(this, todo) }
                  editing={ this.state.editing === todo.id }
                  onSave={ this.save.bind(this, todo) }
                  onCancel={ this.cancel }
                  onSwap={ this.swap }
        />
      );
    }, this);

    var activeTodoCount = todos.reduce(function(accum, todo) {
      return todo.completed ? accum : accum + 1;
    }, 0);

    var main;
    if (todos.length) {
      main = (
        <section className='main'> 
          <input className='toggle-all'
                 type='checkbox'
                 checked={ activeTodoCount === 0 }
                 onChange={ this.toggleAll.bind(this) }
          />
          <ul className='todo-list'>
            { todoItems }
          </ul>
        </section>
      );
    }

    var completedCount = todos.length - activeTodoCount;

    var footer;
    if (activeTodoCount || completedCount) {
      footer = (
        <Footer count={ activeTodoCount }
                completedCount={ completedCount }
                nowShowing={ this.state.nowShowing }
                onClearCompleted={ this.clearCompleted }
        />
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

const render = () => {
  ReactDom.render(<TodoApp model={ model } />, document.getElementById('root'));
}

model.subscribe(render);

render();
