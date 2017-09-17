import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { newReview } from '../reducer/review'

class WriteReview extends Component {
	constructor(props) {
		super(props)
		this.state = {
			productId: props.prodId,
			reviewerName: props.reviewerName,
			reviewText: '',
			score: 0
		}
		this.handleSubmit = this.handleSubmit.bind(this)
		this.handleChange = this.handleChange.bind(this)
	}

	handleSubmit(event) {
		event.preventDefault();
		this.setState({triedToSubmit: true})
		// need to add reviewerID
		this.props.submitReview({
			productId: this.state.productId,
			reviewerName: this.state.reviewerName,
			reviewText: this.state.reviewText,
			score: this.state.s
		})
	}

	handleChange(event) {
		const field = event.target.name;
		const content = event.target.value;
		this.setState({[field]: content})
	}

	render() {
		return (
			<div>
				<div id="reviews">
					<h2>Your Review</h2>
				  	<div className="submit-review">
						<form onSubmit={this.handleSubmit}>
							<p><label htmlFor="name">Name</label> <input name="reviewerName" type="text" onChange={this.handleChange}/></p>
							<div className="rating-chooser">
						  		<p>Your rating</p>
						  		<select name='score' onChange={this.handleChange}>
									{[1, 2, 3, 4, 5].map((rating, idx) => (<option key={idx}>{rating}</option>))}
								</select>
							</div>
							<p><label htmlFor="review">Your review</label> <textarea name="reviewText" onChange={this.handleChange} id cols={30} rows={10} defaultValue={""} required/></p>
							<p><input type="submit" value="Submit" /></p>
						</form>
					</div>
				</div>
			</div>
		)
	}
}

const mapState = null

const mapDispatch = function(dispatch, ownProps) {
	return {
		submitReview(review) {
			dispatch(newReview(review, ownProps.prodId, ownProps.history))
		}
	}
}

export default connect(mapState, mapDispatch)(WriteReview)