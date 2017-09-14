import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
// import productReducer from './product'

import reducer from './product';

// const reducer = combineReducers({
// 	productReducer
// });

const store = createStore(
  reducer,
  applyMiddleware(
    thunkMiddleware,
    createLogger()
  )
);

export default store;