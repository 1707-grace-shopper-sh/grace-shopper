import axios from 'axios';


//THUNK
export default function checkout(orderInfo, history){
	return function thunk(dispatch) {
		return axios.put('/api/checkout', orderInfo)
		.then(res => {
            return res.data})
		.then(() => {
            console.log('trying to redirect')
			history.push(`/thankyou`)
		})
	}
}