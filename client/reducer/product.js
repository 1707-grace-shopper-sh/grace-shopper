import axios from 'axios';

const initialState = {
	products: []
};

// ACTION
const GET_PRODUCTS = 'GET_PRODUCTS';

// ACTION CREATOR
export function getProducts(products) {
	const action = {type: GET_PRODUCTS, products};
	return action;
}

// THUNK CREATOR
export function fetchProducts() {
	return function thunk(dispatch) {
		return axios.get('/api/products')
		.then(res => res.data)
		.then(products => {
			console.log('reducer products: ', products)
			const action = getProducts(products);
			console.log('reducer action: ', action)
			dispatch(action);
		});
	};
}

function productReducer(state = initialState, action) {
	switch (action.type) {
		case GET_PRODUCTS: {
			return Object.assign({}, state, {products: action.products});
		}
		default: {
			return state;
		}
	}
}

export default productReducer;