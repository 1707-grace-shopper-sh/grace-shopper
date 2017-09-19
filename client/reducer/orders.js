import axios from 'axios'

const GET_ORDERS = 'GET_ORDERS'

const getOrders = (orders) => {
    return { type: GET_ORDERS, orders }
}

export const gettingOrders = () => {
    return function thunk() {
        return axios.get('/api/orders')
            .then(orders => {
                dispatch(getOrders(orders))
            })
            .catch(err => console.log('There was a problem getting your orders', err))
    }
}

export default function(state=[], action){
    switch(action.type) {
        case GET_ORDERS: return action.type
        default: return state
    }
}