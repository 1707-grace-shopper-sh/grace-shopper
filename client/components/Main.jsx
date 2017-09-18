// general imports
import { withRouter } from 'react-router';
import { Route, Switch } from 'react-router-dom';
import React, { Component} from 'react';
import { fetchProducts } from '../reducer/products';
import { connect } from 'react-redux';
import { me } from '../reducer/user'

//component imports
import SingleProduct from './SingleProduct.jsx';
import AllProducts from './AllProducts.jsx';
import EditProduct from './EditProduct.jsx';
import NewProduct from './NewProduct.jsx';
import WriteReview from './WriteReview.jsx';
import Navbar from './Navbar.jsx';

import Auth from './Auth.jsx'


class Main extends Component {

	componentDidMount() {
		this.props.fetchInitialData();
		this.props.loadSessionData();
	}

	render() {
		return (
			<div>
				<Navbar />
				<Switch>
					<Route exact path="/product/:id" component={SingleProduct} />
					<Route path="/product/:id/edit" component={EditProduct} />
					<Route path="/product/:id/write-review" component={WriteReview} />
					<Route exact path="/product/new" component={NewProduct} />
					<Route path='/filter' component={AllProducts} />
					<Route path='/search' component={AllProducts} />
					<Route path='/user/auth' component = {Auth}/>
					<Route component={AllProducts} />
				</Switch>
			</div>
		);
	}
}


const mapDispatchToProps = function (dispatch) {
	return {
		fetchInitialData: function () {
			const productsThunk = fetchProducts();
			dispatch(productsThunk);
		},
		loadSessionData: function () {
			const meThunk = me();
			dispatch(meThunk)
		}
	}
}

export default withRouter(connect(null, mapDispatchToProps)(Main));
