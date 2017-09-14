// general imports
import { withRouter } from 'react-router';
import { Route, Switch } from 'react-router-dom';
import React, { Component} from 'react';
import { fetchProducts } from '../reducer/product';
import { connect } from 'react-redux';

//component imports
import SingleProduct from './SingleProduct.jsx';
import AllProducts from './AllProducts.jsx';
import EditProduct from './EditProduct.jsx';
import NewProduct from './NewProduct.jsx';
import Navbar from './Navbar.jsx';
import Checkout from './Checkout.jsx';

class Main extends Component {

	componentDidMount() {
		this.props.fetchInitialData();
	}

	render() {
		return (
			<div>
				<Navbar />
				<Switch>
					<Route exact path="/product/:id" component={SingleProduct} />
					<Route exact path="/checkout" component={Checkout} />
					<Route path='/:category' component={AllProducts} />
					<Route component={AllProducts} />
				</Switch>
			</div>
		);
	}
}

const mapStateToProps = null;

const mapDispatchToProps = function(dispatch) {
  return {
    fetchInitialData: function() {
    	console.log('in the fetching initial data func');
      const productsThunk = fetchProducts();
      dispatch(productsThunk);
    }
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));