import { createReducer } from 'ducks/createReducer';

const OPEN_MODAL = 'modal/OPEN_MODAL';
const CLOSE_MODAL = 'modal/CLOSE_MODAL';

type Types = typeof OPEN_MODAL | typeof CLOSE_MODAL;

type ModalType = 'none' | 'createTodo' | 'viewTodo';

type ModalPropsType = {
  [propName: string]: any;
};
// State
type ModalViewType = {
  modalType: ModalType;
  modalProps?: ModalPropsType;
}

export type State = ModalViewType;

const initialState: State = { modalType: 'none' };

// Action Creators
export const openModal = (modalType: ModalType, modalProps?: ModalPropsType = {}) => ({
  type: OPEN_MODAL as typeof OPEN_MODAL,
  payload: {
    modal: {
      modalType,
      modalProps
    }
  }
});

export const closeModal = () => ({
  type: CLOSE_MODAL as typeof CLOSE_MODAL,
  payload: {
    modal: initialState
  }
});

type OpenModalAction = ReturnType<typeof openModal>;
type CloseModalAction = ReturnType<typeof closeModal>;

export type Action = OpenModalAction | CloseModalAction;

// Reducer
export default createReducer<State, Types, Action>(initialState, {
  [OPEN_MODAL]: (state, action: OpenModalAction) => {
    return action.payload.modal;
  },
  [CLOSE_MODAL]: (state, action: CloseModalAction) => {
    return action.payload.modal;
  },
});
