import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { postProduct } from '../reducer/products';

function AdminPanel(props) {
    return (
        <div>
            <div className='container'>
                <div className='row'>
                    <div className="col-md-12">
                            <div className="product-content-right">
                                <h2>Enter new product information</h2>
                                <form onSubmit={props.submitNewProduct}>
                                    <div className="col-sm-12">
                                        <div className="product-inner submit-review">
                                            <p>
                                                <label>Image URL:</label>
                                                <input name='imageURL' type='text' required />
                                            </p>
                                            <p>
                                                <label>Title:</label>
                                                <input name='title' type='text' required />
                                            </p>
                                            <p>
                                                <label>Price:</label>
                                                <input name='price' type='text' required />
                                            </p>
                                            <p>
                                                <label>Inventory:</label>
                                                <input name='inventory' type='number' required />
                                            </p>
                                            <p>
                                                <label>Category:</label>
                                                <select name='category'>
                                                    {props.categories.map(category => {
                                                        return (
                                                            <option key={category}>{category}</option>
                                                        )
                                                    })}
                                                </select>
                                            </p>
                                            <p>
                                                <label>Description:</label>
                                                <textarea
                                                    name='description'
                                                    type='text'
                                                    required
                                                />
                                            </p>
                                            <p>
                                                <button type='submit'>Create Product</button>
                                            </p>
                                        </div>
                                    </div>
                                </form>
                            </div>
                    
                    </div>
                </div>

            </div>
        </div>
    )
}

const mapState = function (state) {
    return {
        categories: state.categories
    }
}

const mapDispatch = function (dispatch, ownProps) {
    return {
        submitNewProduct(event) {
            event.preventDefault();
            const newProductDetails = {
                category: event.target.category.value,
                description: event.target.description.value,
                title: event.target.title.value,
                price: event.target.price.value,
                imUrl: event.target.imageURL.value,
                inventory: event.target.inventory.value
            }
            dispatch(postProduct(newProductDetails, ownProps.history))
        }
    }
}

export default connect(mapState, mapDispatch)(AdminPanel)