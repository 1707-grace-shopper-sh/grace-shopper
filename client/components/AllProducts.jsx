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
			<div className="single-product-area">
				<div className="zigzag-bottom" />
					<div className="container">
						<div className="row">
						{
							products.map((product, idx) => {
								return (
									<div key={idx} className="col-md-3 col-sm-6">
								  		<div className="single-shop-product">
											<div className="product-upper">
										  			<Link to={`/product/${product.id}`}>
										  				<img src={product.imUrl} alt />
										  			</Link>
											</div>
											<div className="product-title">
												<Link to={`/product/${product.id}`}>
													<h4>{product.title}</h4>
												</Link>
											</div>
											<div className="product-carousel-price">
									  			<ins>Price: ${Number.parseFloat(product.price).toFixed(2)}</ins>
											</div>  
											<div className="product-option-shop">
										  		<a className="add_to_cart_button" data-quantity={1} data-product_sku data-product_id={70} rel="nofollow" href="/">Add to cart</a>
											</div>   
										</div>                    
								  	</div>
						  		)
						  	})
						}
					</div>
				</div>
			</div>
		);
	
};

const mapStateToProps = function(state, ownProps) {
	return {
		products: state.products
	};
};

const mapDispatchToProps = null;

// withRouter necessary for history here
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AllProducts));

