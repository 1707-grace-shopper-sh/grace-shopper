
import axios from 'axios'


const GET_USER = 'GET_USER'
const REMOVE_USER = 'REMOVE_USER'


const getUser = user => {
  return { type: GET_USER, user }
}

const removeUser = () => {
  return {type: REMOVE_USER}
}

export const creatingUser = (user, history) => {
  return function thunk(dispatch) {
    return axios.post('/api/auth/create', user)  
      .then(res=>{
        dispatch(getUser(res.data))
        history.push('/')
      })
      .catch(err=> {
        console.log("creating user was unsuccessful", err) // OB - this is where Toaster would come in 
      })
  }
}

export const loggingInUser = (user, history) => {
  return function thunk(dispatch) {
    return axios.post('/api/auth/login', user)
      .then(res=>{
        dispatch(getUser(res.data))
        history.push('/')
      })
      .catch(err=>{console.log("logging in user was unsuccessful", err)}) // SH - some more Toaster
  }
}

export const loggingOutUser = (userEmail) => {
  return function thunk(dispatch) {
    return axios.post('/api/auth/logout', userEmail)
      .then(() => {
        dispatch(removeUser())
        console.log('getting here')
        history.push('/user/auth')
      })
      .catch(err=>{console.log(err)})
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