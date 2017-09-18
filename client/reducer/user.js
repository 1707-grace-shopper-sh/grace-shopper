
import axios from 'axios'
import history from '../history'


const GET_USER = 'GET_USER'
const REMOVE_USER = 'REMOVE_USER'


const getUser = user => {
  return { type: GET_USER, user }
}

const removeUser = () => {
  return {type: REMOVE_USER}
}

export const creatingUser = (user) => {
  return function thunk(dispatch) {
    return axios.post('/api/auth/create', user)  
      .then(res=>{
        dispatch(getUser(user))
        history.push('/')
      })
      .catch(err=> {console.log("creating user was unsuccessful", err)})
  }
}

export const loggingInUser = (user) => {
  return function thunk(dispatch) {
    return axios.post('/api/auth/login', user)
      .then(res=>{
        dispatch(getUser(user))
        history.push('/')
      })
      .cathc(err=>{console.log("logging in user was unsuccessful", err)})
  }
}

export const loggingOutUser = (userEmail) => {
  console.log('logging out user w email', userEmail)
  function thunk(dispatch) {
    return axios.post('/api/auth/logout', userEmail)
      .then(res => {
        dispatch(removeUser())
        history.push('/user/auth')
      })
      .cathc(err=>{console.log("logging in user was unsuccessful", err)})
  }
}

export const me = () => {
  return function thunk(dispatch) {
    axios.get('api/auth/me')
      .then(res => {
        dispatch(getUser(res.data))
      })
      .catch(err => console.log('me thunk failed', err))
  }
}



export default function (state = {}, action) {
  switch (action.type) {
    case GET_USER: return action.user
    case REMOVE_USER: return {}
    default: return state
  }
}