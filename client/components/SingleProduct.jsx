import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { postCartEntry } from '../reducer/cart';

function SingleProduct(props) {

	const product = props.currentProduct;
	const options = [];
	// for select dropdown with quantity options (inspired by Amazon UI)
	for (var i = 1; i <= product.inventory; i++) {
		options.push(<option key={i}>{i}</option>);
	}

	function handleSubmit(event) {
		event.preventDefault();
		const id = product.id
		const quantity = event.target.quantity.value
		const cartEntry = {id, quantity}
		props.addToCart(cartEntry);
	}

		return (
			<div className="row"> 
				<div className="col-lg-6 col-md-6 col-s-12 col-xs-12">
					<p>{product.title}</p>
					<img className="card-img-top" src={product.imUrl} alt />
					<h5>Price: {product.price}</h5>
					<p className="card-text">{product.description}</p>
				</div>
				<div className="col-lg-6 col-md-6 col-s-12 col-xs-12">
					<form name="addToCart" onSubmit={handleSubmit}>
					  Quantity ({product.inventory} remaining)
						<select name="quantity"> {options} </select>
					  <button type="submit">Add To Cart</button>
					</form>
				</div>
			</div>
		);
};

const mapState = function(state, ownProps) {
	// pull id off the url
	const id = ownProps.match.params.id;
	function thisId(product) {
		return product.id == id;
	}
	// find that element in the products on state
	const idx = state.products.findIndex(thisId);
	return {
		currentProduct: state.products[idx]
	}
};

const mapDispatch = function(dispatch) {
	return {
		addToCart: function(cartEntry) {
			console.log('in the addToCart mapDispatch')
			const cartThunk = postCartEntry(cartEntry)
			dispatch(cartThunk)
		}
	}
};


export default connect(mapState, mapDispatch)(SingleProduct);