import React from 'react';
import Footer from './Footer';
import AddTodo from '../containers/AddTodo';
import VisibleTodoList from '../containers/VisibleTodoList';

const App = () => (
  <section className='todoapp'>
    <div>
      <AddTodo />
      <VisibleTodoList />
      <Footer />
    </div>
  </section>
);

export default App;
