import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';


function ThankYou(props) {

    return (
        <div>
            <div className='container'>
                <div className='row'>
                    <div className="col-md-12">
                        <div className="product-content-right">
                        <h2 className="sidebar-title">Thank you for your order!</h2>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default withRouter(ThankYou)