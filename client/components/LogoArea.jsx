import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

function LogoArea(props) {

	const total = props.cart.reduce(function(sum, entry) {
		console.log('price')
		console.log(typeof +entry.product.price)
		return sum + (entry.quantity * +entry.product.price)
	}, 0)

	return (
		<div className="site-branding-area">
			<div className="container">
				<div className="row">
					<div className="col-sm-6">
						<div className="logo">
							<h1><Link to="/"><img src="img/logo.png" /></Link></h1>
						</div>
					</div>
					<div className="col-sm-6">
						<div className="shopping-item">
							<Link to="/cart">Cart - <span className="cart-amunt">${Number.parseFloat(total).toFixed(2)}</span> <i className="fa fa-shopping-cart" /> <span className="product-count">{props.cart.length}</span></Link>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

const mapState = state => {
	return {
		cart: state.cart
	}
}

const mapDispatch = null

export default connect(mapState, mapDispatch)(LogoArea);