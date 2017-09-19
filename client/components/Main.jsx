// general imports
import { withRouter } from 'react-router'
import { Route, Switch } from 'react-router-dom';
import React, { Component} from 'react';
import { fetchProducts } from '../reducer/products';
import { fetchCategories } from '../reducer/category'
import { fetchCart } from '../reducer/cart'
import { connect } from 'react-redux';
import { me } from '../reducer/user'

//component imports
import SingleProduct from './SingleProduct.jsx';
import AllProducts from './AllProducts.jsx';
import EditProduct from './EditProduct.jsx';
import NewProduct from './NewProduct.jsx';
import Navbar from './Navbar.jsx';
import LogoArea from './LogoArea.jsx'
import Header from './Header.jsx'
import Auth from './Auth.jsx'
import Footer from './Footer.jsx'
import AdminPanel from './AdminPanel.jsx'
import Cart from './Cart.jsx'
import Account from './Account.jsx'


class Main extends Component {

	componentDidMount() {
		this.props.fetchInitialData()
		this.props.loadSessionData()
	}

	render() {
		return (
			<div>
				<Header />
				<LogoArea />
				<Navbar />
				<Switch>
					<Route exact path="/admin" component={AdminPanel} />
					<Route exact path="/product/new" component={NewProduct} />
					<Route exact path="/product/:id" component={SingleProduct} />
					<Route path="/product/:id/edit" component={EditProduct} />
					<Route path='/filter' component={AllProducts} />
					<Route path='/search' component={AllProducts} />
					<Route path='/user/auth' component={Auth}/>
					<Route path = '/user/account' component = {Account} />
					<Route path='/cart' component={Cart} />
					<Route component={AllProducts} />
				</Switch>
				<Footer />
			</div>
		);
	}
}


const mapDispatchToProps = function (dispatch) {
	return {
		fetchInitialData: function () {
			const productsThunk = fetchProducts();
			const categoriesThunk = fetchCategories();
			dispatch(productsThunk);
			dispatch(categoriesThunk);
		},
		loadSessionData: function () {
			const meThunk = me();
			dispatch(meThunk)
		}
	}
}

export default withRouter(connect(null, mapDispatchToProps)(Main));
