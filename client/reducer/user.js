import axios from 'axios'
import history from '../history'

// ACTION TYPES
const GET_USER = 'GET_USER'
const REMOVE_USER = 'REMOVE_USER'


// ACTION CREATORS
const getUser = user => {
	return { type: GET_USER, user }
}

// THUNK CREATORS
export const creatingUser = user => {
	return function thunk(dispatch) {
		return axios.post('/api/auth', user)  
			.then(res => {
				dispatch(getUser({id: res.data.id, email: res.data.email}))
				history.push('/home')
			})
			.catch(err => {console.log("creating user was unsuccessful", err)})
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
		case GET_USER: 
			return action.user
		default: 
			return state
	}
}