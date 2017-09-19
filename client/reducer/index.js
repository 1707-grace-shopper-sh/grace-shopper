import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';

// IMPORT SUBREDUCERS
import products from './products'
import cart from './cart'
import currentUser from './user';
import reviews from './review'
import categories from './category'
import checkout from './checkout'


const reducer = combineReducers({
	categories, 
  products,
  cart, 
  reviews,
  currentUser
});


const store = createStore(
  reducer,
  applyMiddleware(
    thunkMiddleware,
    createLogger()
  )
);

export default store;