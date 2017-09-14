
import thunk from 'redux-thunk'
import axios from 'axios'

const CREATE_USER = 'CREATE_USER'

const createUser = (user) => {
 return {type: CREATE_USER, user}
}

export const creatingUser = (user) => {
  return function thunk(dispatch) {
    return axios.post('/api/users', user)  
      .then(res=>{
        dispatch(createUser({email: res.data}))
      })
      .catch(err=> {console.log("creating user was unsuccessful", err)})
  }
}

export default function users (users = [], action) {
  switch(action.type) {
    case CREATE_USER: {
      return  [...users, action.user]
    }
    default: return users
  } 
}

