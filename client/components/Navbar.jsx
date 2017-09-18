import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Searchbar from './Searchbar.jsx';
import loggingOutUser from '../reducer/user'

function Navbar(props) {

	const categories = props.categories

	return (
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
	                				return <li key={idx}><Link to={`/filter?category=${category}`}>{category}</Link></li>
	                			})
	                		}
	                		<Searchbar />
	              		</ul>
	            	</div>  
	          	</div>
	        </div>
	    </div>
	)
}

const mapState = function (state) {
	return {
		categories: state.categories
	}
}

const mapDispatch = function (dispatch) {
	return {
		logoutUser: function(userEmail){
			dispatch(loggingOutUser(userEmail))
		}
	}
}


export default connect(mapState)(Navbar);
