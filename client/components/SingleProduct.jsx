import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router';
import Reviews from './Reviews.jsx';

function SingleProduct(props) {

	const product = props.currentProduct;
	
	return (
		<div className="row">
			<div className="col-lg-6 col-md-6 col-s-12 col-xs-12">
				<p>{product.title}</p>
				<img className="card-img-top" src={product.imUrl} alt />
				<h5>Price: {product.price}</h5>
				<p className="card-text">{product.description}</p>
			</div>
			<div>
				<h3>Reviews</h3>
				<button><Link to={`/product/${product.id}/write-review`}>Review this product</Link></button>
				<Reviews prodId={props.prodId} />
			</div>
			<div className="col-lg-6 col-md-6 col-s-12 col-xs-12">
				<form action="#">
					Quantity
					  <input type="number" name="quantity" min="1" max={product.inventory} />
					<input type="submit" />
				</form>
			</div>
		</div>
	);
};

const mapStateToProps = function (state, ownProps) {
	// pull id off the url
	const id = ownProps.match.params.id;
	function thisId(product) {
		return product.id == +id;
	}
	// find that element in the products on state
	const idx = state.products.findIndex(thisId);
	return {
		currentProduct: state.products[idx] || { id: 0, title: '', description: '', price: 0, imURL: '', inventory: 0, category: '' },
		prodId: +id
	}
};

const mapDispatchToProps = null;


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SingleProduct));