import axios from 'axios'

// ACTION
const ADD_TO_CART = 'ADD_TO_CART'

// ACTION CREATOR
export function addToCart(cartEntry) {
	const action = {type: ADD_TO_CART, cartEntry}
	return action
}

// THUNK CREATOR
export function postCartEntry(cartEntry, history) {
	return function thunk(dispatch) {
		return axios.post('/api/cart', cartEntry)
		.then(res => res.data)
		.then(cartEntry => {
			const action = addToCart(cartEntry);
			dispatch(action);
		})
	}
}

function cartReducer(state = [], action) {
	switch (action.type) {
		case ADD_TO_CART: {
			return [...state, action.cartEntry]
		}
		default: {
			return state
		}
	}
}

export default cartReducer