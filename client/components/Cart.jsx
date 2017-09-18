import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

function Cart(props) {

	console.log('the cart is')
	console.log(props.cart)

	return (
		<div className="site-branding-area">
			<div className="single-product-area">
				<div className="container">
					<h2 className="product-name">Your Shopping Cart</h2>
					<div className="row">
						<form method="post" action="#">
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
								<tr className="cart_item">
								  <td className="product-remove">
									<a title="Remove this item" className="remove" href="#">×</a> 
								  </td>
								  <td className="product-thumbnail">
									<a href="single-product.html"><img width={145} height={145} alt="poster_1_up" className="shop_thumbnail" src="img/product-thumb-2.jpg" /></a>
								  </td>
								  <td className="product-name">
									<a href="single-product.html">Ship Your Idea</a> 
								  </td>
								  <td className="product-price">
									<span className="amount">£15.00</span> 
								  </td>
								  <td className="product-quantity">
									<div className="quantity buttons_added">
									  <input type="button" className="minus" defaultValue="-" />
									  <input type="number" size={4} className="input-text qty text" title="Qty" defaultValue={1} min={0} step={1} />
									  <input type="button" className="plus" defaultValue="+" />
									</div>
								  </td>
								  <td className="product-subtotal">
									<span className="amount">£15.00</span> 
								  </td>
								</tr>
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

const mapState = state => {
	return {
		cart: state.cart
	}
}

const mapDispatch = null

export default connect(mapState, mapDispatch)(Cart);