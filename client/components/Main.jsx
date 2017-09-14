import { withRouter } from 'react-router';
import { Route, Switch } from 'react-router-dom';
import React, { Component } from 'react';
import AllProducts from './AllProducts.jsx';
import { fetchProducts } from '../reducer/product';
import { connect } from 'react-redux';
import { me } from '../reducer/currentUserReducer'

class Main extends Component {

	componentDidMount() {
		this.props.fetchInitialData();
		this.props.loadSessionData();
	}

	render() {
		return (
			<div>
				<Switch>
					<Route component={AllProducts} />
					{
						this.props.isLoggedIn &&
						<Switch>
							{/* User hompage, only available after logging in */}
							<Route path='/home' component={UserHome} />
						</Switch>
					}
				</Switch>
			</div>
		);
	}
}

const mapStateToProps = (state) =>{
	return {
		isLoggedIn: !!state.currentUser.id
	}
};

const mapDispatchToProps = function (dispatch) {
	return {
		fetchInitialData: function () {
			console.log('in the fetching initial data func');
			const productsThunk = fetchProducts();
			dispatch(productsThunk);
		},
		loadSessionData: function () {
			const meThunk = me();
			dispatch(meThunk)
		}
	}
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));
