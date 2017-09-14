import axios from 'axios';

const initialState = {
	products: [],
	product: {}
};

// ACTION
const GET_PRODUCTS = 'GET_PRODUCTS';
const GET_PRODUCT = 'GET_PRODUCT';
const UPDATE_PRODUCT = 'UPDATE_PRODUCT';

// ACTION CREATOR
export function getProducts(products) {
	const action = {type: GET_PRODUCTS, products};
	return action;
}

export function getProduct(product) {
	return {
		type: GET_PRODUCT,
		product: product
	}
}

export function updateProduct(product) {
	return {
		type: UPDATE_PRODUCT,
		product: product
	}
}

// THUNK CREATOR
export function fetchProducts() {
	return function thunk(dispatch) {
		return axios.get('/api/products')
		.then(res => res.data)
		.then(products => {
			const action = getProducts(products);
			dispatch(action);
		});
	};
}

export function postProduct(product, history){
	return function thunk(dispatch) {
		return axios.post('/api/products', product)
		.then(res => res.data)
		.then(newProduct => {
			dispatch(getProduct(product))
			history.push(`/product/${newProduct.id}`)
		})
	}
}

export function editProduct(product, prodID, history){
	return function thunk(dispatch) {
		return axios.put(`/api/products/${prodID}`, product)
		.then(res => res.data)
		.then(product => {
			dispatch(updateProduct(product))
			history.push(`/product/${product.id}`)
		})
	}
}

function productReducer(state = initialState, action) {
	switch (action.type) {
		case GET_PRODUCTS: {
			return Object.assign({}, state, {products: action.products});
		}
		case GET_PRODUCT: {
			return Object.assign({}, state, {product: action.product});
		}
		case UPDATE_PRODUCT: {
			return Object.assign({}, state, {product: action.product});
		}
		default: {
			return state;
		}
	}
}

export default productReducer;