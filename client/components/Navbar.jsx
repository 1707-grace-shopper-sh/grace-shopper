import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

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
			</div>
		</nav>
	);
}

const mapStateToProps = function(state) {
    return {
        categories: ['Seafood', 'Candy', 'Condiments & Seasonings', 'Tea & Beverages']
    }
}

const mapDispatchToProps = null;


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Navbar));