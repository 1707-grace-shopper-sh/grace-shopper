import React from 'react';
import { Link } from 'react-router-dom';

function LogoArea(props) {

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
							<a href="cart.html">Cart - <span className="cart-amunt">$100</span> <i className="fa fa-shopping-cart" /> <span className="product-count">5</span></a>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default LogoArea;