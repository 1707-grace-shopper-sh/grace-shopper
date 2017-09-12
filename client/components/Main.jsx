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
				<AllProducts />
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