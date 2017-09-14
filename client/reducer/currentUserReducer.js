
import axios from 'axios'
import history from '../history'

const GET_USER = 'GET_USER'
const REMOVE_USER = 'REMOVE_USER'

const defaultUser = {}

const getUser = user => { type: GET_USER, user }

const me = () => {
  function meThunk(dispatch) {
    axios.post('/auth/me')
      .then(res => {
        dispatch(getUser(res.data))
      })
      .catch(err => console.log('me thunk failed', err))
  }
}

export default function (state = defaultUser, action) {
  switch (action.type) {
    case GET_USER: return action.user
    default: return state
  }
}