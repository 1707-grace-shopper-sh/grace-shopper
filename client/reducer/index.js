import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';

// IMPORT SUBREDUCERS
import products from './products'
import cart from './cart'
import users from './usersReducer';
import currentUser from './currentUserReducer'


const reducer = combineReducers({
  products,
  users,
  cart, 
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