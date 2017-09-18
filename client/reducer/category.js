import axios from 'axios'

// ACTION
const GET_CATEGORIES = 'GET_CATEGORIES'

// ACTION CREATOR
export function getCategories(categories) {
	const action = {type: GET_CATEGORIES, categories}
	return action
}

// THUNK CREATOR
export function fetchCategories() {
	return function thunk(dispatch) {
		return axios.get('/api/products/categories')
		.then(res => res.data)
		.then(categories => {
			const action = getCategories(categories)
			dispatch(action)
		})
	}
}

function categoryReducer(state = [], action) {
	switch (action.type) {
		case GET_CATEGORIES: {
			return action.categories
		}
		default: {
			return state
		}
	}
}

export default categoryReducer