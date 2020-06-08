import update from 'immutability-helper';
import { ThunkAction } from 'redux-thunk'

import { RootState } from 'ducks/store';
import { createReducer } from 'ducks/createReducer';

// Action Types - Very short list of actions, keeping to a minimum to save time.
const LOAD = 'todo/LOAD';
const CREATE = 'todo/CREATE';
const FETCH_TODO = 'todo/FETCH_TODO';
const TOGGLE_IS_DONE = 'todo/TOGGLE_IS_DONE';

type Types = typeof LOAD | typeof CREATE | typeof TOGGLE_IS_DONE | typeof FETCH_TODO;

// State
export type TodoType = {
  id: string;
  createdAt: string;
  title: string;
  description: string;
  priority: number;
  tags: string[];
  isDone: boolean;
};

export type State = TodoType[];

const initialState: State = [];

// Action Creators
const loadedTodos = (todos: State) => ({
  type: LOAD as typeof LOAD,
  payload: {
    todos
  }
});

const createdTodo = (todo: TodoType) => ({
  type: CREATE as typeof CREATE,
  payload: {
    todo
  }
});

const toggledTodoIsDone = (todo: TodoType) => ({
  type: TOGGLE_IS_DONE as typeof TOGGLE_IS_DONE,
  payload: {
    todo
  }
});

const fetchedTodo = (todo: TodoType) => ({
  type: FETCH_TODO as typeof FETCH_TODO,
  payload: {
    todo
  }
});


type LoadAction = ReturnType<typeof loadedTodos>;
type CreateAction = ReturnType<typeof createdTodo>;
type ToggleTodoIsDoneAction = ReturnType<typeof toggledTodoIsDone>;
type FetchTodoAction = ReturnType<typeof fetchedTodo>;

export type Action = LoadAction | CreateAction | ToggleTodoIsDoneAction | FetchTodoAction;

// thunks - ideally these would dipatch more actions to indicate intiation / completion / errors of network requests.
// Ideally using a factory function to generate these network related actions.

export const loadTodos = (): ThunkAction<void, RootState, unknown, LoadAction> => async dispatch => {
  try {
    const asyncResponse = await fetch('https://backend-test.pi-top.com/todo-test/v1/todos') || [];
    const todos = await asyncResponse.json();
    dispatch(loadedTodos(todos as State));
  } catch (error) {
    /* Should be handling this.. */
    console.error("error", error)
  }
};

export const createTodo = (
  todo: TodoType
): ThunkAction<void, RootState, unknown, CreateAction> => async dispatch => {
  try {

    const asyncResponse = await fetch(`https://backend-test.pi-top.com/todo-test/v1/todos`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(todo)
    });
    const update = await asyncResponse.json();
    dispatch(createdTodo(update as TodoType));
  }  catch (error) {
    /* Should be handling this.. */
    console.error("error", error)
  }
};

export const toggleTodoIsDone = (
  todo: TodoType
  ): ThunkAction<void, RootState, unknown, ToggleTodoIsDoneAction> => async dispatch => {
  try {
    const asyncResponse = await fetch(`https://backend-test.pi-top.com/todo-test/v1/todos/${todo.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        isDone: todo.isDone
      })
    });
    const update = await asyncResponse.json();
    dispatch(toggledTodoIsDone(update as TodoType));
  } catch (error) {
    /* Should be handling this.. */
    console.error("error", error)
  }
};

export const fetchTodo = (
  todo: TodoType
): ThunkAction<void, RootState, unknown, FetchTodoAction> => async dispatch => {
  try {
    const asyncResponse = await fetch(`https://backend-test.pi-top.com/todo-test/v1/todos/${todo.id}`);
    const update = await asyncResponse.json();
    dispatch(fetchedTodo(update as TodoType));
  }  catch (error) {
    /* Should be handling this.. */
    console.error("error", error)
  }
};

// Reducer
export default createReducer<State, Types, Action>(initialState, {
  [LOAD]: (state, action: LoadAction) => {
    return action.payload.todos;
  },
  [CREATE]: (state, action: CreateAction) => {
    return update(state, { $push: [ action.payload.todo ] });
  },
  [TOGGLE_IS_DONE]: (state, action: ToggleTodoIsDoneAction) => {
    const indexToEdit = state.findIndex(item => item.id === action.payload.todo.id);
    return update(state, { [indexToEdit]: { isDone: { $set: action.payload.todo.isDone }}});
  },
  [FETCH_TODO]: (state, action: FetchTodoAction) => {
    const indexToReplace = state.findIndex(item => item.id === action.payload.todo.id);
    return update(state, { [indexToReplace]: { $set: action.payload.todo }});
  }
});