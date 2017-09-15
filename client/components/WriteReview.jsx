import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { newReview } from '../reducer/review'

class WriteReview extends Component {
    constructor(props) {
        super(props)
        this.state = {
            reviewerID: props.reviewerID,
            reviewerName: props.reviewerName,
            reviewText: '',
            score: 0
        }
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }

    handleSubmit(event) {
        event.preventDefault();
        this.props.submitReview(this.state)
    }

    handleChange(event) {
        const field = event.target.name;
        const content = event.target.value;
        this.setState({[field]: content})
    }

    render() {
        return (
            <div>
                <h1>Review {this.props.product.title}</h1>
                <form onSubmit={this.handleSubmit}>
                    <label>Reviewing as: {this.props.reviewerName}</label>
                    <input name='reviewerName' type='hidden' value={this.props.reviewerName} />
                    <input name='reviewerID' type='hidden' value={this.props.reviewerID} />
                    <label>Rating:</label>
                    <select name='score' onChange={this.handleChange}>
                        {[1, 2, 3, 4, 5].map(score => {
                            return (
                                <option>{score}</option>
                            )
                        })}
                    </select>
                    <label>Review:</label>
                    <input
                        name='reviewText'
                        type='text'
                        onChange={this.handleChange}
                        required
                    />
                    <button type='submit' disabled={this.state.reviewText.length<10}>Submit Review</button>
                </form>
            </div>
        )
    }
}

const mapState = function (state, ownProps) {
    const prodId = ownProps.match.params.id
    return {
        product: state.products.find(product => product.id === +prodId) || { id: 0, title: '', description: '', price: 0, imURL: '', inventory: 0, category: '' },
        reviewerID: '123', //dummy id
        reviewerName: 'dummy buyer'

    }
}

const mapDispatch = function (dispatch, ownProps) {
    return {
        submitReview(review) {
            dispatch(newReview(review, ownProps.match.params.id, ownProps.history))
        }
    }
}

export default connect(mapState, mapDispatch)(WriteReview)