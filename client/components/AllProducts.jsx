import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router';
import queryString from 'query-string';

function AllProducts(props) {

	let products; 

		// if the user reached this from the search route 
		if (props.location.pathname === '/search') {
			const target = queryString.parse(props.location.search).product;

			// product title must contain search query (ignoring case)
			function matchesTarget(product) {
				return product.title.toLowerCase().includes(target.toLowerCase());
			}

			products = props.products.filter(matchesTarget);

		// if the user is trying to filter by category
		} else if (props.location.pathname === '/filter') {
			const category = queryString.parse(props.location.search).category;

			function inCategory(product) {
				return product.category == category;
			}

			products = props.products.filter(inCategory);

		// otherwise load all products
		} else {
			products = props.products;
		}

		return (
			<div className="row"> 
				{
				products.map((product, idx) => {
					return (
						<div key={idx} className="col-lg-4 col-md-6 mb-4">
							<div className="card h-100">
							<Link to={`/product/${product.id}`}><img className="card-img-top" src={product.imUrl} alt /></Link>
							<div className="card-body">
								<h4 className="card-title">
									<Link to={`/product/${product.id}`}>Title: {product.title}</Link>
								</h4>
								<h5>Price: {product.price}</h5>
								<p className="card-text">{product.description.slice(0,100) + "..."}</p>
							</div>
							<div className="card-footer">
								<small className="text-muted">★ ★ ★ ★ ☆</small>
							</div>
							</div>
						</div>
					)
				})
				}
			</div>
		);
	
};

function searchFilter() {

}

const mapStateToProps = function(state, ownProps) {
	return {
		products: state.products
	};
};

const mapDispatchToProps = null;

// DON'T REMOVE THIS ONE EITHER :) 
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AllProducts));

