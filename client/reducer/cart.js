import axios from 'axios'

// ACTION
const GET_CART = 'GET_CART'
const ADD_TO_CART = 'ADD_TO_CART'
const REMOVE_ENTRY = 'REMOVE_ENTRY'

// ACTION CREATOR
export function getCart(cart) {
	const action = {type: GET_CART, cart}
	return action
}

export function addToCart(cartEntry) {
	const action = {type: ADD_TO_CART, cartEntry}
	return action
}

export function removeEntry(cartEntry) {
	const action = {type: REMOVE_ENTRY, cartEntry}
	return action
}

// THUNK CREATOR
export function fetchCart() {
	return function thunk(dispatch) {
		return axios.get('/api/cart')
		.then(res => res.data)
		.then(cart => {
			const action = getCart(cart)
			dispatch(action)
		})
	}
}

export function postCartEntry(cartEntry) {
	return function thunk(dispatch) {
		console.log('in post cart entry thunk')
		return axios.post('/api/cart', cartEntry)
		.then(res => res.data)
		.then(cartEntry => {
			const action = addToCart(cartEntry)
			dispatch(action)
		})
	}
}

export function deleteCartEntry(cartEntry) {
	return function thunk(dispatch) {
		return axios.delete('/api/cart/')
		.then(res => res.data)
		.then(cartEntry => {
			const action = removeEntry(cartEntry)
			dispatch(action)
		})
	}
}

function cartReducer(state = [], action) {
	switch (action.type) {
		case GET_CART: {
			return action.cart
		}
		case ADD_TO_CART: {
			console.log('action cart Entry')
			console.log(typeof action.cartEntry)
			console.log(action.cartEntry)
			function thisEntry(entry) {
				return entry.id == action.cartEntry.id
			}
			const idx = state.findIndex(thisEntry)
			console.log('need to modify')
			console.log(idx)
			if (idx == -1) {
				console.log('adding product')
				return [...state, action.cartEntry]
			} else {
				console.log('editing product')
				const newState = [...state]
				newState[idx].quantity = action.cartEntry.quantity
				return newState
			}
		}
		default: {
			return state
		}
	}
}

export default cartReducer