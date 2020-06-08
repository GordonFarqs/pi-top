import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { toggleTodoIsDone, TodoType } from 'ducks/todos';
import { openModal } from 'ducks/modal';

import styles from 'css/components/todoListItem.module';

interface Props {
  todo: TodoType;
}

const TodoListItem: React.FC<Props> = ({
  todo,
}) => {
  const dispatch = useDispatch();

  const handleIsDone = ({ target }) => {
    setIsLoading(true);
    dispatch(toggleTodoIsDone({
      ...todo,
      isDone: !todo.isDone
    }));
  };

  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    setIsLoading(false);
  }, [todo.isDone]);

  return (
    <div className={styles.listItem}>
      <div className={styles.title}
        onClick={() => {
          dispatch(openModal('viewTodo', { resource: todo }))
        }}
      >
        { todo.title }
      </div>
      <div className={styles.isDone}>
        { isLoading ? (
          <div className={styles.loader}/>
        ): (
          <>
            <input
              type="checkbox"
              className={styles.checkbox}
              id={`isDone_${todo.id}`}
              name="isDone"
              checked={todo.isDone}
              onChange={handleIsDone}
            />
            <label htmlFor="isDone" className={styles.checkbox} >
              completed
            </label>
          </>
        )}
      </div>

    </div>
  );
};

export default TodoListItem;
