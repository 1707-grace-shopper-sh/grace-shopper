import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import Searchbar from './Searchbar.jsx';

function Navbar(props) {

	const categories = props.categories
	const userName = props.userName
	const userEmail =  props.userEmail
	const isLoggedIn = props.isLoggedIn

	return (
		<nav className="navbar navbar-default navbar-static-top" role="navigation" style={{ marginBottom: 0 }}>
			<div className="navbar-header">
				<Link className="navbar-brand" to="/">Grace's Gourmet Goods</Link>
				{
					categories.map((category, idx) => {
						return <Link key={idx} className="navbar-brand" to={`/filter?category=${category}`}>{category}</Link>
					})
				}
				<Searchbar />
				{
					isLoggedIn ? <h3>Welcome, {userName || userEmail}</h3> : <Link to ="/user/auth">Login or Sign Up</Link>
				}
			</div>
		</nav>
	)
}

const mapState = function (state) {
	return {
		categories: ['Seafood', 'Candy', 'Condiments & Seasonings', 'Tea & Beverages'],
		isLoggedIn: !!state.currentUser.id,
		userName: state.currentUser.name, 
		userEmail: state.currentUser.email
		
	}
}



export default withRouter(connect(mapState)(Navbar));
