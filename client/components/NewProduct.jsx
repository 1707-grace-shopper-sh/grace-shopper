import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { postProduct } from '../reducer/products';


function NewProduct (props){
    return (
        <div>
            <h2>Enter new product information</h2>
            <form onSubmit={props.submitNewProduct}>
                <label>title:</label>
                <input 
                    name='title'
                    type='text'
                    required
                />
                <label>description:</label>
                <input 
                    name='description'
                    type='text'
                    required
                />
                <label>price:</label>
                <input 
                    name='price'
                    type='number'
                    required
                />
                <label>image URL:</label>
                <input 
                    name='imageURL'
                    type='text'
                    required
                />
                <label>inventory:</label>
                <input 
                    name='inventory'
                    type='number'
                    required
                />
                <label>category:</label>
                <select name='category'>
                    {/* hardcoded the few categories we have. If we want categories to be dynamic, we will have to chnge this */}
                     {props.categories.map(category => {
                        return (
                             <option>{category}</option> 
                        )
                    })} 
                </select>
                <button type='submit'>Create Product</button>
            </form>
        </div>
    )
}

const mapState = function(state){
    return {
        categories: ['Seafood', 'Candy', 'Condiments & Seasonings', 'Tea & Beverages']
    }
}

const mapDispatch = function(dispatch, ownProps){
    return {
        submitNewProduct(event){
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