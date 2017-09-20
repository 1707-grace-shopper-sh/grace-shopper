import axios from 'axios'


//THUNK
export default function checkout(orderInfo, history) {
	return function thunk(dispatch) {
		return axios.put('/api/checkout', orderInfo)
		.then(res => {
            return res.data})
		.then(() => {
			history.push(`/thankyou`)
		})
	}
}