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
        console.log('nextProps', nextProps)
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
                                            <th className="product-thumbnail">&nbsp;</th>
                                            <th className="product-name">Product</th>
                                            <th className="product-price">Price</th>
                                            <th className="product-quantity">Quantity</th>
                                            <th className="product-subtotal">Total</th>
                                            <th className="product-price">Status</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {orders.map((order, idx) => {
                                            if(order.status==='complete'){
                                                order.status=`Purchased ${order.updatedAt.slice(0,10)}, Not Yet Shipped`
                                            } else {
                                                order.status = 'Order Incomplete'
                                            }
                                            return (<tr className="cart_item" key={order.id}>
                                                <td className="product-thumbnail">
                                                    <Link to={`/product/${order.product.id}`}><img width={145} height={145} alt="poster_1_up" className="shop_thumbnail" src={order.product.imUrl} /></Link>
                                                </td>
                                                <td className="product-name">
                                                    <Link to={`/product/${order.product.id}`}>{order.product.title}</Link>
                                                </td>
                                                <td className="product-price">
                                                    <span className="amount">${Number.parseFloat(order.product.price).toFixed(2)}</span>
                                                </td>
                                                <td className="product-price">
                                                    <span className="amount">${Number.parseFloat(order.quantity).toFixed(2)}</span>
                                                </td>
                                                <td className="product-subtotal">
                                                    <span className="amount">${Number.parseFloat(order.product.price * order.quantity).toFixed(2)}</span>
                                                </td>
                                                <td className="product-name">
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
        orders: state.orders
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