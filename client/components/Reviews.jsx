import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchReviews } from '../reducer/review';

class Reviews extends Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        this.props.fetchReviewData(this.props.prodId)
    }

    render() {
        return (
            <div>
                {this.props.reviews.map(review=>{
                    return (
                        <div key={review.id}>
                            <h4>{review.reviewerName}</h4>
                            <p>{review.reviewText}</p>
                        </div>
                    )
                })}
            </div>
        )
    }
}

const mapState = function (state) {
    return {
        reviews: state.reviews
    }
}

const mapDispatch = function (dispatch) {
    return {
        fetchReviewData(prodId) {
            dispatch(fetchReviews(prodId))
        }
    }
}

export default connect(mapState, mapDispatch)(Reviews)
