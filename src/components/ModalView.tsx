import React, { useEffect } from 'react';
import { RootState } from 'ducks/store';
import { useSelector, useDispatch } from 'react-redux';
import { closeModal } from 'ducks/modal';
import TodoForm from 'components/TodoForm';

import styles from 'css/components/modal.module';

const modalViewMap = {
  'createTodo': TodoForm,
  'viewTodo': TodoForm,
};

const ModalView: React.FC = () => {
  const dispatch = useDispatch();
  const modalState = useSelector((state: RootState) => state.modal);
  if (modalState.modalType === 'none') {
    return null;
  }

  const Form = modalViewMap[modalState.modalType];
  return (
    <div className={styles.modal}>
      <button
        className={styles.closeModalButton}
        onClick={() => dispatch(closeModal())}
      >
        X
      </button>
      <Form {...modalState.modalProps} />
    </div>
  );
};

export default ModalView;

