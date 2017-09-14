import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import checkout from '../reducer/checkout';

function Checkout(props) {
    return (
        <div>
            <h1>Checkout Items</h1>
            <p>To be filled out</p>
            <form onSubmit={props.checkout}>
                <button type='submit'>Checkout</button>
            </form>
        </div>
    )
}

const mapState = null;

const mapDispatch = function (dispatch) {
    const dummyorder = {hi:bye}
    return {
        checkout(event) {
            dispatch(checkout(dummyorder))
        }
    }
}

export default connect(mapState,mapDispatch)(Checkout)