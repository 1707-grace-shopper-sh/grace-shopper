import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';

// IMPORT SUBREDUCERS
import products from './products'
import cart from './cart'

const reducer = combineReducers({
  products,
  cart
});

const store = createStore(
  reducer,
  applyMiddleware(
    thunkMiddleware,
    createLogger()
  )
);

export default store;