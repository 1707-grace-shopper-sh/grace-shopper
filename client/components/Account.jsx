import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { gettingOrders } from '../reducer/orders'

class Cart extends Component {

    constructor(props) {
        super(props)
        this.state = {
            orders: []
        }
    }

    componentDidMount() {
        this.props.gettingOrders()
    }

    componentWillReceiveProps(nextProps){
        this.setState({orders: nextProps.orders})
    }

    render() {
        const orders = this.state.orders
        return (
            <div className="site-branding-area">
                <div className="single-product-area">
                    <div className="container">
                        <h2 className="product-name">Your Orders</h2>
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
                                        {orders.map((order, idx) => {
                                            return (<tr className="cart_item" key={order.id}>
                                                <td className="product-thumbnail">
                                                    <Link to={`/product/${order.id}`}><img width={145} height={145} alt="poster_1_up" className="shop_thumbnail" src={order.imUrl} /></Link>
                                                </td>
                                                <td className="product-name">
                                                    <Link to={`/product/${order.id}`}>{order.title}</Link>
                                                </td>
                                                <td className="product-price">
                                                    <span className="amount">${Number.parseFloat(order.price).toFixed(2)}</span>
                                                </td>
                                                <td className="product-price">
                                                    <span className="amount">${Number.parseFloat(order.price).toFixed(2)}</span>
                                                </td>
                                                <td className="product-subtotal">
                                                    <span className="amount">${Number.parseFloat(order.price * order.quantity).toFixed(2)}</span>
                                                </td>
                                                <td className="product-price">
                                                    <span className="amount">{order.status}</span>
                                                </td>
                                            </tr>)
                                        })}

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
        cart: state.orders
    }
}

const mapDispatch = dispatch => {
    return {
        gettingOrders: function () {
            dispatch(gettingOrders())
        }
    }
}

export default connect(mapState, mapDispatch)(Cart);