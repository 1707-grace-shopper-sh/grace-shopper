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

export function removeEntry(entryId) {
	const action = {type: REMOVE_ENTRY, entryId}
	return action
}

// THUNK CREATOR

export function postCartEntry(cartEntry) {
	return function thunk(dispatch) {
		return axios.post('/api/cart', cartEntry)
		.then(res => {
			console.log(res.data)
			return res.data})
		.then(cartEntry => {
			console.log(cartEntry)
			const action = addToCart(cartEntry)
			dispatch(action)
		})
	}
}

export function deleteCartEntry(entryId) {
	return function thunk(dispatch) {
		return axios.delete(`/api/cart/${entryId}`)
		.then(res => res.data)
		.then(cartEntry => {
			const action = removeEntry(entryId)
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
			function thisEntry(entry) {
				return entry.id == action.cartEntry.id
			}
			const idx = state.findIndex(thisEntry)
			if (idx == -1) {
				return [...state, action.cartEntry]
			} else {
				const newState = [...state]
				newState[idx].quantity = action.cartEntry.quantity
				return newState
			}
		}
		case REMOVE_ENTRY: {
			function thisEntry(entry) {
				return entry.id == action.entryId
			}
			const idx = state.findIndex(thisEntry)
			const newState = [...state]
			newState.splice(idx, 1)
			return newState
		}
		default: {
			return state
		}
	}
}

export default cartReducer