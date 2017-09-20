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
        const stringArray = string.slice(0,10).split("-")
        const year = stringArray[0]
        const monthNum = stringArray[1]
        const day = stringArray[2]
        const month = (function(month) {  
          switch(month) {
            case '01': return 'January'
            case '02': return 'February'
            case '03': return 'March'
            case '04': return 'April'
            case '05': return 'May'
            case '06': return 'June'
            case '07': return 'July'
            case '08': return 'August'
            case '09': return 'September'
            case '10': return 'October'
            case '11': return 'November'
            case '12': return 'December'
            default: return month
        }})(monthNum)
        const date = month + ' ' + day + ', ' + year
        return date
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
