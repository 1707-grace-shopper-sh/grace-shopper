import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import productReducer from './product'


import users from './usersReducer';
import currentUser from './currentUserReducer'

const reducer = combineReducers({
  productReducer,
  users,
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