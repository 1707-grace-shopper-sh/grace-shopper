
import axios from 'axios'
import history from '../history'

const GET_USER = 'GET_USER'
const REMOVE_USER = 'REMOVE_USER'


const getUser = user => {
  return { type: GET_USER, user }
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
  console.log('action in currentUserReducer', action)
  switch (action.type) {
    case GET_USER: return action.user
    default: return state
  }
}