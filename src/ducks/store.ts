import thunk from 'redux-thunk';
import { combineReducers } from 'redux';
import { createStore, applyMiddleware } from 'redux';

// import all reducers here
import todos from './todos';
import modal from './modal';

// combine reducers
const rootReducer = combineReducers({
  todos,
  modal
});

const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);

export type RootState = ReturnType<typeof rootReducer>

const store = createStoreWithMiddleware(
  rootReducer,
  //@ts-ignore
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
);

export default store;
