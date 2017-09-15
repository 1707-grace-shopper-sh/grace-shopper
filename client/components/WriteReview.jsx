import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { newReview } from '../reducer/review'

function WriteReview(props){
    
    return(
        <div>
            <h1>Review {props.product.name}</h1>
            <form onSubmit={props.submitReview}>
                <label>Reviewing as: {props.reviewerName}</label>
                <input name='reviewerName' type='hidden' value={props.reviewerName} />
                <input name='reviewerID' type='hidden' value={props.reviewerID} />
                <label>Rating:</label>
                <select name='score'>
                    {[1,2,3,4,5].map(score => {
                        return (
                            <option>{score}</option>
                        )
                    })}
                </select>
                <label>Review:</label>
                <input 
                    name='reviewText'
                    type='text'
                    required
                />
                <button type='submit'>Submit Review</button>
            </form>
        </div>
    )
}

const mapState = function(state, ownProps){
    const prodId = ownProps.match.params.id
    return {
        product: state.products.find(product => product.id === +prodId) || { id: 0, title: '', description: '', price: 0, imURL: '', inventory: 0, category: '' },
        reviewerID: '123', //dummy id
        reviewerName: 'dummy buyer'
        
    }
}

const mapDispatch = function(dispatch, ownProps){
    return {
        submitReview(event){
            event.preventDefault();
            const review = {
                reviewerID: event.target.reviewerID.value,
                reviewerName: event.target.reviewerName.value,
                reviewText: event.target.reviewText.value,
                score: event.target.score.value
            }
            dispatch(newReview(review,ownProps.match.params.id, ownProps.history))
        }
    }
}

export default connect(mapState, mapDispatch)(WriteReview)