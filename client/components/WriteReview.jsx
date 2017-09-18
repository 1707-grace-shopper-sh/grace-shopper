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
			overall: 0,
			dirty: false
		}
		this.handleSubmit = this.handleSubmit.bind(this)
		this.handleChange = this.handleChange.bind(this)
	}

	handleSubmit(event) {
		event.preventDefault();
		// need to add reviewerID
		this.props.submitReview({
			productId: this.state.productId,
			reviewerName: this.state.reviewerName,
			reviewText: this.state.reviewText,
			overall: this.state.overall
		})
	}

	handleChange(event) {
		const field = event.target.name;
		const content = field==='overall' ? parseFloat(event.target.value) : event.target.value;
		this.setState({[field]: content})
		this.setState({dirty: true})
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
						  		<select name='overall' onChange={this.handleChange}>
									{[1, 2, 3, 4, 5].map((rating, idx) => (<option key={idx}>{rating}</option>))}
								</select>
							</div>
							<p><label htmlFor="review">Your review</label> <textarea name="reviewText" onChange={this.handleChange} id cols={30} rows={10} defaultValue={""} required/></p>
							{(this.state.dirty&&this.state.reviewText.length<10) ? <p>Your review must be longer</p> : null}
							<p><button type="submit" value="Submit" disabled={this.state.reviewText.length<10}>Submit</button></p>
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
			// not sure ownProps.history is necessary
			dispatch(newReview(review, ownProps.prodId, ownProps.history))
		}
	}
}

export default connect(mapState, mapDispatch)(WriteReview)