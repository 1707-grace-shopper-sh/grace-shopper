import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { postCartEntry } from '../reducer/cart'

class Cart extends Component {

	constructor(props) {
		super(props)
		var trackedCart = props.cart.map(function(el) {
			var trackedEntry = Object.assign({}, el)
			trackedEntry.wasModified = false
			return trackedEntry
		})
		this.state = {
			cart: trackedCart
		}
		this.handleSubmit = this.handleSubmit.bind(this)
		this.handleChange = this.handleChange.bind(this)
	}


	handleChange(event) {
		const idx = event.target.id
		const newQuantity = event.target.value
		let cartCopy = this.state.cart
		cartCopy[+idx].quantity = +newQuantity
		cartCopy[+idx].wasModified = true
		this.setState({cart: cartCopy})
		console.log(this.state)
	}

	handleSubmit(event) {
		event.preventDefault()
		for (let i = 0; i < this.state.cart.length; i++) {
			let cartEntry = this.state.cart[i]
			if (cartEntry.wasModified) {
				cartEntry.replaceValue = true
				this.props.addToCart(cartEntry)
			}
		}
	}

	render () {
	return (
		<div className="site-branding-area">
			<div className="single-product-area">
				<div className="container">
					<h2 className="product-name">Your Shopping Cart</h2>
					<div className="row">
						<form method="post" onSubmit={this.handleSubmit}>
							<table cellSpacing={0} className="shop_table cart">
							  <thead>
								<tr>
								  <th className="product-remove">&nbsp;</th>
								  <th className="product-thumbnail">&nbsp;</th>
								  <th className="product-name">Product</th>
								  <th className="product-price">Price</th>
								  <th className="product-quantity">Quantity</th>
								  <th className="product-subtotal">Total</th>
								</tr>
							  </thead>
							  <tbody>
								{
									this.props.cart.map((entry, idx) => {
										return (<tr className="cart_item" key={entry.id}>
											<td className="product-remove">
												<a title="Remove this item" className="remove" onClick={this.handleClick}>×</a> 
											</td>
											<td className="product-thumbnail">
												<Link to={`/product/${entry.product.id}`}><img width={145} height={145} alt="poster_1_up" className="shop_thumbnail" src={entry.product.imUrl} /></Link>
											</td>
											<td className="product-name">
												<Link to={`/product/${entry.product.id}`}>{entry.product.title}</Link>
											</td>
											<td className="product-price">
												<span className="amount">${Number.parseInt(entry.product.price).toFixed(2)}</span> 
											</td>
											<td className="product-quantity">
												<div className="quantity buttons_added">
												  
													<input type="number" size={4} className="input-text qty text" title="Qty" id={idx} defaultValue={entry.quantity} min={1} step={1} onChange={this.handleChange}/>
												</div>
											</td>
											<td className="product-subtotal">
												<span className="amount">${Number.parseInt(entry.product.price * entry.quantity).toFixed(2)}</span> 
											</td>
										</tr>)
										
									})
								}
								<tr>
									<td className="actions" colSpan={6}>
										<div className="coupon">
											<label htmlFor="coupon_code">Coupon:</label>
											<input type="text" placeholder="Coupon code" defaultValue id="coupon_code" className="input-text" name="coupon_code" />
											<input type="submit" defaultValue="Apply Coupon" name="apply_coupon" className="button" />
										</div>
										<input type="submit" defaultValue="Update Cart" name="update_cart" className="button" />
										<input type="submit" defaultValue="Checkout" name="proceed" className="checkout-button button alt wc-forward" />
									</td>
								</tr>
							  </tbody>
							</table>
						  </form>
					</div>
				</div>
			</div>
		</div>
	)
	}
}

const mapState = state => {
	return {
		cart: state.cart
	}
}

const mapDispatch = (dispatch) => {
	return {
		addToCart: function(cartEntry) {
			const cartThunk = postCartEntry(cartEntry)
			dispatch(cartThunk)
		}
	}
}

export default connect(mapState, mapDispatch)(Cart);