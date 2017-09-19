import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import checkout from '../reducer/checkout';

function Checkout(props) {
    return (
        <div>
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <h2>Checkout</h2>
                        <form onSubmit={props.gocheckout}>
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
                                />
                            </div>
                            <div>
                                <label>Email:</label>
                                <input
                                    name='email'
                                    type='text'
                                    required
                                />
                            </div>
                            <div>
                                <label>Shipping Address:</label>
                                <input
                                    name='shipaddress'
                                    type='text'
                                    required
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

const mapState = null

const mapDispatch = function (dispatch, ownProps) {

    return {
        gocheckout(event) {
            event.preventDefault()
            const recip = {
                name: event.target.name.value,
                email: event.target.email.value,
                shipaddress: event.target.shipaddress.value
            }
            const orderInfo = {
                order: { title: 'YOUR ORDER' },
                recipient: recip
            }
            console.log(orderInfo)
            dispatch(checkout(orderInfo, ownProps.history)) //order and recipient need to be joined into 1 object here
        }
    }
}

export default connect(mapState, mapDispatch)(Checkout)