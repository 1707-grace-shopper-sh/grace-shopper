import axios from 'axios'

const GET_ORDERS = 'GET_ORDERS'

const getOrders = (orders) => {
    return { type: GET_ORDERS, orders }
}

export const gettingOrders = () => {
    return function thunk(dispatch) {
        return axios.get('/api/orders')
            .then(res => {
                dispatch(getOrders(res.data))
            })
            .catch(err => console.log('There was a problem getting your orders', err))
    }
}

export default function(state=[], action){
    switch(action.type) {
        case GET_ORDERS: return action.orders
        default: return state
    }
}