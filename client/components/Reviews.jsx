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

    returnStars(rating) {
        let stars = []
        for (let i = 0; i < rating; i++) {
            stars.push(<i className="fa fa-star" />)
        }
        return stars
    }

    parseDate(string) {
        return string.slice(0,10)
    }

    render() {
        return (
            <div>
                {this.props.reviews.map(review => {
                    return (
                        <div key={review.id}>
                            <h4>By {review.reviewerName} on {this.parseDate(review.createdAt)}</h4>
                            <p>{this.returnStars(review.overall)}</p>
                            <p>{review.reviewText}</p>
                        </div>
                    )
                })}
            </div>
        )
    }
}

const mapState = function(state) {
    return {
        reviews: state.reviews
    }
}

const mapDispatch = function(dispatch) {
    return {
        fetchReviewData(prodId) {
            console.log('trying to fetch reviews')
            dispatch(fetchReviews(prodId))
        }
    }
}

export default connect(mapState, mapDispatch)(Reviews)
