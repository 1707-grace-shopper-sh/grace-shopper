import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { postProduct } from '../reducer/products';


function NewProduct(props) { // OB - edit product and new product might be able to use the same form component?
    return (
        <div>
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <div className="product-content-right">
                            <h2>Enter new product information</h2>
                            <form onSubmit={props.submitNewProduct}>
                                <div className="col-sm-3">
                                    <label>Image URL:</label>
                                    <input
                                        name='imageURL'
                                        type='text'
                                        required
                                    />
                                </div>
                                <div className="col-sm-9">
                                    <div className="product-inner">
                                        <div>
                                        <label>Title:</label>
                                        <input
                                            name='title'
                                            type='text'
                                            required
                                        />
                                        </div>
                                        <div>
                                        <label>Price:</label>
                                        <input
                                            name='price'
                                            type='number'
                                            required
                                        />
                                        </div>
                                        <div>
                                        <label>Inventory:</label>
                                        <input
                                            name='inventory'
                                            type='number'
                                            required
                                        />
                                        </div>
                                        <div>
                                        <label>Category:</label>
                                        <select name='category'>
                                            {/* hardcoded the few categories we have. If we want categories to be dynamic, we will have to chnge this */}
                                            {props.categories.map(category => {
                                                return (
                                                    <option>{category}</option>
                                                )
                                            })}
                                        </select>
                                        </div>
                                        <p>
                                            <label>Description:</label>
                                            <textarea
                                                name='description'
                                                type='text'
                                                required
                                            /></p>
                                        <button type='submit'>Create Product</button>
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
        categories: ['Seafood', 'Candy', 'Condiments & Seasonings', 'Tea & Beverages']
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

export default connect(mapState, mapDispatch)(NewProduct)