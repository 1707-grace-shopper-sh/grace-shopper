import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

function SingleProduct(props) {

	const product = props.currentProduct;
	const options = [];
	// for select dropdown with quantity options (inspired by Amazon UI)
	for (var i = 1; i <= product.inventory; i++) {
		options.push(<option key={i}>{i}</option>);
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
					<form action="#">
					  Quantity ({product.inventory} remaining)
						<select name="quantity"> {options} </select>
					  <button name="addToCart" type="submit">Add To Cart</button>
					</form>
				</div>
			</div>
		);
};

const mapStateToProps = function(state, ownProps) {
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

const mapDispatchToProps = null;


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SingleProduct));