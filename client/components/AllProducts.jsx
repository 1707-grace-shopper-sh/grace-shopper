import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router';

function AllProducts(props) {

	let products; 

		// if the user reached this from the search route 
		if (props.location.pathname === '/search') {
			console.log('You tried to search!');
			const target = props.location.state.product; 
			console.log('target is', target);

			// product title must contain search query (ignoring case)
			function matchesTarget(product) {
				return product.title.toLowerCase.includes(target.toLowerCase);
			}

			products = props.products.filter(matchesTarget);
		}

		const category = props.category.replace("-", " & ");
		function inCategory(product) {
			return product.category == category;
		}
		const products = category ? props.products.filter(inCategory) : props.products;

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
									<a href="#">Title: {product.title}</a>
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
		products: state.products,
		category: ownProps.match.params.category || ""
	};
};

const mapDispatchToProps = null;

// DON'T REMOVE THIS ONE EITHER :) 
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AllProducts));

