import { withRouter } from 'react-router';
import { Route, Switch } from 'react-router-dom';
import React, { Component} from 'react';
import AllProducts from './AllProducts.jsx';
import { fetchProducts } from '../reducer/product';
import { connect } from 'react-redux';

class Main extends Component {

	componentDidMount() {
		this.props.fetchInitialData();
	}

	render() {
		return (
			<div>
				<Switch>
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