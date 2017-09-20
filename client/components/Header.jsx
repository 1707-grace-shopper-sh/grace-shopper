import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import {loggingOutUser} from '../reducer/user'

class Header extends Component {
	constructor(props) {
		super(props)
		this.handleClick = this.handleClick.bind(this)
	}

	handleClick(event) {
		event.preventDefault()
		this.props.logoutUser(this.props.userEmail)
	}
	
	render(){
		const userName = this.props.userName
		const userEmail = this.props.userEmail
		const isLoggedIn = this.props.isLoggedIn
		const isAdmin = this.props.isAdmin
		
		return (
			<div className="header-area">
				<div className="container">
					<div className="row">
						<div className="col-md-8">
							<div className="user-menu">
								<ul>
								{
									isLoggedIn ? <Link to="/user/account"><i className="fa fa-user" />My Account</Link> :  <Link to="/user/auth"><i className="fa fa-user" />My Account</Link>
								}
									<li><a href="#"><i className="fa fa-heart" />Wishlist</a></li>
									<li><Link to="/cart"><i className="fa fa-user" />Checkout</Link></li>
                  					<li>
                  						{ 
                  							isAdmin ? <Link to={`/admin`}>Admin Options</Link> : ""
                  						}
                  					</li>
									<li>
										{
											!isLoggedIn ? <Link to="/user/auth"><i className="fa fa-user" />Login or Create Account</Link> : <a onClick = {this.handleClick}><i className="fa fa-user" />Logout</a>
										}
									</li>
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
}

const mapState = function (state) {
	return {
		isLoggedIn: !!state.currentUser.id,
		userName: state.currentUser.name,
		userEmail: state.currentUser.email,
		isAdmin: state.currentUser.isAdmin
	}
}

const mapDispatch = function (dispatch) {
	    return {
	        logoutUser: function(userEmail) {
				dispatch(loggingOutUser(userEmail))
	        }
	    }
	}

export default connect(mapState, mapDispatch)(Header);