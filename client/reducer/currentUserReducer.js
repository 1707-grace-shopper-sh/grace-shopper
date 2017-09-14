
import axios from 'axios'
import history from '../history'

const GET_USER = 'GET_USER'
const REMOVE_USER = 'REMOVE_USER'


const getUser = user => {
  console.log('inside get user')
  return { type: GET_USER, user }
}

export const me = () => {
  console.log('in me thunk')
  function meThunk(dispatch) {
    axios.post('/auth/me')
      .then(res => {
        console.log("res", res)
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