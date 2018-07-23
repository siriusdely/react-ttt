import { connect } from 'react-redux';
import { deleteTodo,
         toggleAllTodos,
         toggleTodo } from '../actions/index';
import TodoList from '../components/TodoList';
import { VisibilityFilters } from '../actions/index';

const getVisibleTodos = (todos, filter) => {
  switch(filter) {
  case VisibilityFilters.SHOW_ALL:
    return todos;
  case VisibilityFilters.SHOW_COMPLETED:
    return todos.filter(t => t.completed);
  case VisibilityFilters.SHOW_ACTIVE:
    return todos.filter(t => !t.completed);
  default:
    return new Error('Unknown filter: ' + filter);
  }
};

const getCount = (todos) => {
  return todos.reduce(function(accum, todo) {
    return todo.completed ? accum : accum + 1;
  }, 0);
}

const mapStateToProps = state => {
  return {
    todos: getVisibleTodos(state.todos, state.visibilityFilter),
    toggleAllActive: state.todos.length !== 0 && getCount(state.todos) === 0
  };
};

const mapDispatchToProps = dispatch => {
  return {
    deleteTodo: id => dispatch(deleteTodo(id)),
    toggleAllTodos: completed => dispatch(toggleAllTodos(completed)),
    toggleTodo: id => {
      dispatch(toggleTodo(id))
    }
  };
};

const VisibleTodoList = connect(
  mapStateToProps,
  mapDispatchToProps
)(TodoList);

export default VisibleTodoList;
