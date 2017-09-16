import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';

import products from './products'
import currentUser from './user';
import reviews from './review'

const reducer = combineReducers({
  products,
  reviews,
  currentUser,
});


const store = createStore(
  reducer,
  applyMiddleware(
    thunkMiddleware,
    createLogger()
  )
);

export default store;