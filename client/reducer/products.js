import axios from 'axios'


// ACTION
const GET_PRODUCTS = 'GET_PRODUCTS'
const ADD_PRODUCT = 'ADD_PRODUCT'
const UPDATE_PRODUCT = 'UPDATE_PRODUCT'


// ACTION CREATOR
export function updateProduct(product) {
	const action = {type: UPDATE_PRODUCT, product}
	return action
}

export function getProducts(products) {
	const action = {type: GET_PRODUCTS, products}
	return action
}

export function addProduct(product) {
	const action = {type: ADD_PRODUCT, product}
	return action
}

// THUNK CREATOR
export function fetchProducts() {
	return function thunk(dispatch) {
		return axios.get('/api/products')
		.then(res => res.data)
		.then(products => {
			const action = getProducts(products)
			dispatch(action)
		});
	};
}

export function postProduct(product, history) {
	return function thunk(dispatch) {
		return axios.post('/api/products', product)
		.then(res => res.data)
		.then(newProduct => {
			dispatch(addProduct(newProduct))
			history.push(`/product/${newProduct.id}`)
		})
	}
}

export function editProduct(product, prodID, history) {
	return function thunk(dispatch) {
		return axios.put(`/api/products/${prodID}`, product)
		.then(res => res.data)
		.then(product => {
			dispatch(updateProduct(product))
			history.push(`/product/${product.id}`)
		})
	}
}

function productReducer(state = [], action) {
	switch (action.type) {
		case GET_PRODUCTS: {
			return action.products
		}
		case ADD_PRODUCT: {
			return [...state, action.product]
		}
		case UPDATE_PRODUCT: {
			const productIndex = state.findIndex((product) => {
				return product.id = action.product.id
			})
			const nextState = [...state]
			nextState[productIndex] = action.product
			return nextState
		}
		default: {
			return state
		}
	}
}

export default productReducer
