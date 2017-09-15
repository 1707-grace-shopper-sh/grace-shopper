import axios from 'axios';

//TYPES
const GET_REVIEWS = 'GET_REVIEWS';
const ADD_REVIEW = 'ADD_PRODUCT'

//CREATORS
export function getReviews(reviews) {
	const action = {type: GET_REVIEWS, reviews};
	return action;
}

export function addReview(review) {
	const action  = {type: ADD_REVIEW, review}
	return action
}

//THUNK
export function fetchReviews(prodId) {
	return function thunk(dispatch) {
		return axios.get(`/api/reviews/by-product/${prodId}`)
		.then(res => res.data)
		.then(reviews => {
			const action = getReviews(reviews);
			dispatch(action);
		});
	};
}

export function newReview(review, prodId, history){
    return function thunk(dispatch){
        return axios.post('/api/reviews', review)
        .then(res => res.data)
        .then(review => {
            dispatch(addReview(review))
            history.push(`/product/${prodId}`)
        })
    }
}

function reviewReducer(state = [], action) {
	switch (action.type) {
		case GET_REVIEWS: {
			return action.reviews;
		}
		case ADD_REVIEW: {
			return [...state, action.review]
		}
		default: {
			return state;
		}
	}
}

export default reviewReducer;