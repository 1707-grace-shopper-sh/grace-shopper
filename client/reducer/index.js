import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import products from './products'
import users from './usersReducer';
import currentUser from './currentUserReducer'
import reviews from './review'

const reducer = combineReducers({
  products,
  reviews,
  users,
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