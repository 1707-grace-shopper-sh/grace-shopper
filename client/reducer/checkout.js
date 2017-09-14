import axios from 'axios';


//THUNK
export default function checkout(order){
	return function thunk(dispatch) {
		return axios.post('/api/checkout', order)
		.then(res => res.data)
		.then(newProduct => {
			dispatch(getProduct(product))
			history.push(`/product/${newProduct.id}`)
		})
	}
}