import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

export default function AdminPanel(props) {
    return (
        <div>
            <div className='container'>
                <div className='row'>
                    <div className="col-md-12">
                        <h2>Add a new product:</h2>
                        <button type='button'><Link to={`/product/new`}>New Product</Link></button>
                    </div>
                </div>

            </div>
        </div>
    )
}