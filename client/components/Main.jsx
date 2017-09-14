// general imports
import { withRouter } from 'react-router';
import { Route, Switch } from 'react-router-dom';
import React, { Component} from 'react';
import { fetchProducts } from '../reducer/product';
import { connect } from 'react-redux';
import { me } from '../reducer/currentUserReducer'

//component imports
import SingleProduct from './SingleProduct.jsx';
import AllProducts from './AllProducts.jsx';
import EditProduct from './EditProduct.jsx';
import NewProduct from './NewProduct.jsx';
import Navbar from './Navbar.jsx';

class Main extends Component {

	componentDidMount() {
		console.log('before inital fetchdata')		
		this.props.fetchInitialData();
		console.log('after inital fetchdata')
		this.props.loadSessionData();
	}

	render() {
		return (
			<div>
				<Navbar />
				<Switch>
					<Route exact path="/product/:id" component={SingleProduct} />
					<Route path="/product/:id/edit" component={EditProduct} />
					<Route exact path="/product/new" component={NewProduct} />
					<Route path='/:category' component={AllProducts} />
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
			const productsThunk = fetchProducts();
			dispatch(productsThunk);
		},
		loadSessionData: function () {
			console.log('in load session data function')
			const meThunk = me();
			dispatch(meThunk)
		}
	}
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));
