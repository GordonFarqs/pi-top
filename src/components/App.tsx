import React from 'react';

import Header from 'components/Header';
import ModalView from 'components/ModalView';
import TodoList from 'components/TodoList';

const App = () => {
  return (
    <>
      <Header />
      <TodoList />
      <ModalView />
    </>
  );
};

export default App;
