import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Searchbar from './Searchbar.jsx';

function Navbar(props) {

	const categories = props.categories;

	return (
		<nav className="navbar navbar-default navbar-static-top" role="navigation" style={{marginBottom: 0}}>
			<div className="navbar-header">
				<Link className="navbar-brand" to="/">Grace's Gourmet Goods</Link>
				{
					categories.map((category, idx) => {
						const url = category.replace(" & ", "-");
						return <Link key={idx} className="navbar-brand" to={`/${url}`}>{category}</Link>
					})
				}
				<Searchbar />
			</div>
		</nav>
	)
}

const mapState = function(state) {
    return {
        categories: ['Seafood', 'Candy', 'Condiments & Seasonings', 'Tea & Beverages']
    }
}

const mapDispatch = null;

export default connect(mapState, mapDispatch)(Navbar);
