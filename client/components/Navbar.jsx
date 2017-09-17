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
		<div>
		<div className="mainmenu-area">
	        <div className="container">
	          <div className="row">
	            <div className="navbar-header">
	              <button type="button" className="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
	                <span className="sr-only">Toggle navigation</span>
	                <span className="icon-bar" />
	                <span className="icon-bar" />
	                <span className="icon-bar" />
	              </button>
	            </div> 
	            <div className="navbar-collapse collapse">
	              <ul className="nav navbar-nav">
	                <li className="active"><Link to="/">Home</Link></li>
	                {
	                	categories.map((category, idx) => {
	                		return <li><Link key={idx} to={`/filter?category=${category}`}>{category}</Link></li>
	                	})
	                }
	                <Searchbar />
	              </ul>
	            </div>  
	          </div>
	        </div>
	      </div>

				{
					isLoggedIn ? <h3>Welcome, {userName || userEmail}</h3> : ""
				}
		</div>
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
