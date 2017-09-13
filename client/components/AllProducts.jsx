import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';

function AllProducts(props) {


		return (
			<div className="row"> 
				{
				props.products.map((product, idx) => {
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

const mapStateToProps = function(state) {
	console.log('the state is', state);
	return {
		products: state.products
	};
};

const mapDispatchToProps = function(dispatch) {
	return {};
}


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AllProducts));

