import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';


function ThankYou(props) {

    return (
        <div>
            <div className='container'>
                <div className='row'>
                    <div className="col-md-12">
                        <h1>THANK YOU</h1>
                        <h2>for your order</h2>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default withRouter(ThankYou)