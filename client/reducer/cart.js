import axios from 'axios'

// ACTION
const GET_CART = 'GET_CART'
const ADD_TO_CART = 'ADD_TO_CART'

// ACTION CREATOR
export function getCart(cart) {
	const action = {type: GET_CART, cart}
	return action
}

export function addToCart(cartEntry) {
	const action = {type: ADD_TO_CART, cartEntry}
	return action
}

// THUNK CREATOR
// export function fetchCart() {
// 	return function thunk(dispatch) {
// 		return axios.get('/api/cart')
// 		.then(res => res.data)
// 		.then(cart => {
// 			const action = getCart(cart)
// 			dispatch(action)
// 		})
// 	}
// // } 

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
		case GET_CART: {
			return action.cart
		}
		case ADD_TO_CART: {
			return [...state, action.cartEntry]
		}
		default: {
			return state
		}
	}
}

export default cartReducer