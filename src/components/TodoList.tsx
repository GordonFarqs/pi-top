import React, { useEffect } from 'react';
import TodoListItem from 'components/TodoListItem';
import { RootState } from 'ducks/store';
import { loadTodos } from 'ducks/todos';
import { useSelector, useDispatch } from 'react-redux';
import { openModal } from 'ducks/modal';
import useMediaQuery from 'hooks/useMediaQuery';

import styles from 'css/components/todoList.module';

const TodoList: React.FC = () => {

  const dispatch = useDispatch();
  const todos = useSelector((state: RootState) => state.todos) || [];
  const isSmallScreen = useMediaQuery('(max-width: 768px)');
  const buttonText = isSmallScreen ? '+' : 'New Todo';

  useEffect(() => {
    dispatch(loadTodos());
  }, []);

  const createNewTodo = () => {
    dispatch(openModal('createTodo'));
  }

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>Todo List</h2>
      <button
        className={styles.addTodoButton}
        onClick={createNewTodo}
      >
        {buttonText}
      </button>
      { todos.map((todo) => <TodoListItem key={todo.id} todo={todo} />)}
    </div>
  );
};

export default TodoList;
