// general imports
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
				<h1>Dummy home page title</h1>
				<p>navigation component will go here</p>
				<main>
					<Switch>
						<Route exact path='/products' component={AllProducts} />
						{/* <Route path='/products/:id' component={products} /> */}
						<Route path='/products/:id/edit' component={EditProduct} />
						<Route path='/products/new' component={NewProduct} />
					</Switch>
				</main>
			</div>
		);
	}
}

const mapStateToProps = null;

const mapDispatchToProps = function(dispatch) {
  return {
    fetchInitialData: function() {
      const productsThunk = fetchProducts();
      dispatch(productsThunk);
    }
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));