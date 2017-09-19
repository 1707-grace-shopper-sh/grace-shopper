import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import checkout from '../reducer/checkout';

class Checkout extends Component {
    constructor(props) {
        super(props)
        this.state = {
            cart: props.cart,
            name: '',
            email: '',
            shipaddress: ''
        }
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }

    handleChange(event) {
        const field = event.target.name;
        const content = event.target.value;
        this.setState({ [field]: content })
    }

    handleSubmit(event) {
        event.preventDefault();
        const recip = {
            name: this.state.name,
            email: this.state.email,
            shipaddress: this.state.shipaddress
        }
        this.state.cart.map(item => {
            console.log(item.id)
            let orderInfo = {
                order: item,
                recipient: recip
            }
            this.props.submitOrder(orderInfo)
        })
    }

    render() {
        return (
            <div>
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <h2>Checkout</h2>
                            <form onSubmit={this.handleSubmit}>
                                <div>
                                    <h4>Payment Options:</h4>
                                    <select>
                                        {['MasterCard', 'Pay Pal'].map(option => (<option>{option}</option>))}
                                    </select>
                                </div>
                                <div>
                                    <h4>Ship to:</h4>
                                    <label>Name:</label>
                                    <input
                                        name='name'
                                        type='text'
                                        required
                                        onChange={this.handleChange}
                                    />
                                </div>
                                <div>
                                    <label>Email:</label>
                                    <input
                                        name='email'
                                        type='text'
                                        required
                                        onChange={this.handleChange}
                                    />
                                </div>
                                <div>
                                    <label>Shipping Address:</label>
                                    <input
                                        name='shipaddress'
                                        type='text'
                                        required
                                        onChange={this.handleChange}
                                    />
                                </div>
                                <button type='submit'>Submit</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapState = function (state) {
    return {
        cart: state.cart
    }
}

const mapDispatch = function (dispatch, ownProps) {

    return {
        submitOrder(orderSet) {
            dispatch(checkout(orderSet, ownProps.history)) //order and recipient need to be joined into 1 object here
        }
    }
}

export default connect(mapState, mapDispatch)(Checkout)