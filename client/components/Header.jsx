import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

function Header(props) {

	const userName = props.userName
	const userEmail =  props.userEmail
	const isLoggedIn = props.isLoggedIn
	console.log('is loggedIn', isLoggedIn, userName, userEmail)
	return (
		<div className="header-area">
	        <div className="container">
	          	<div className="row">
	            	<div className="col-md-8">
	              		<div className="user-menu">
	                		<ul>
	                  			<li><a href="#"><i className="fa fa-user" /> My Account</a></li>
	                  			<li><a href="#"><i className="fa fa-heart" /> Wishlist</a></li>
	                  			<li><a href="cart.html"><i className="fa fa-user" /> My Cart</a></li>
	                  			<li><a href="checkout.html"><i className="fa fa-user" /> Checkout</a></li>
	                  			<li><a href="#"><i className="fa fa-user" /> Login</a></li>
	                		</ul>
	              		</div>
	            	</div>
		            <div className="col-md-4">
		             	<div className="header-right">
		                	<ul className="list-unstyled list-inline">
		                  		<li>
		                  			{
										isLoggedIn ? <span>Welcome, {userName || userEmail}</span> : ""
									}
		                  		</li> 
		                	</ul>
		              	</div>
		            </div>
	       		</div>
	        </div>
	    </div>
	)
}

const mapState = function (state) {
	return {
		isLoggedIn: !!state.currentUser.id,
		userName: state.currentUser.name, 
		userEmail: state.currentUser.email
		
	}
}

export default connect(mapState)(Header);