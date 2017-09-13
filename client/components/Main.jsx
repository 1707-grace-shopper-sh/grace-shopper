// general imports

import AllProducts from './AllProducts.jsx';
import SingleProduct from './SingleProduct.jsx';
import { withRouter } from 'react-router';
import { Route, Switch } from 'react-router-dom';
import React, { Component} from 'react';
import { fetchProducts } from '../reducer/product';
import { connect } from 'react-redux';

//component imports
import AllProducts from './AllProducts.jsx';
import EditProduct from './EditProduct.jsx';
import NewProduct from './NewProduct.jsx';

class Main extends Component {

	componentDidMount() {
		this.props.fetchInitialData();
	}

	render() {
		return (
			<div>
				<Switch>
					<Route exact path="/product/:id" component={SingleProduct} />
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