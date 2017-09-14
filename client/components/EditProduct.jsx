import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

function NewProduct (props){
    return (
        <div>
            <h2>Edit this product's information</h2>
            <form>
                <label>title:</label>
                <input 
                    name='title'
                    type='text'
                    value = {props.product.title}
                    required
                />
                <label>description:</label>
                <input 
                    name='description'
                    type='text'
                    value = {props.product.description}
                    required
                />
                <label>price:</label>
                <input 
                    name='price'
                    type='number'
                    value = {props.product.price}
                    required
                />
                <label>image URL:</label>
                <input 
                    name='imageURL'
                    type='text'
                    value = {props.product.imURL}
                    required
                />
                <label>inventory:</label>
                <input 
                    name='inventory'
                    type='number'
                    value = {props.product.inventory}
                    required
                />
                <label>category:</label>
                <select>
                    {/* hardcoded the few categories we have. If we want categories to be dynamic, we will have to chnge this */}
                     {props.categories.map(category => {
                         if (category === props.product.category) {
                            return (
                                <option selected='selected'>{category}</option>
                            )
                         } else {
                            return (
                             <option>{category}</option> 
                        )
                         }
                    })} 
                </select>
                <button type='submit'>Edit Product</button>
            </form>
        </div>
    )
}

const mapState = function(state, ownProps){
    console.log(state.products)
    const prodId = ownProps.match.params.id //last part after params can change potentially depending on frontend router
    return {
        categories: ['Seafood', 'Candy', 'Condiments & Seasonings', 'Tea & Beverages'],
        product: state.products.find(product => product.id ===prodId) || { id: 0, title: '', description: '', price: 0, imURL: '', inventory: 0, category: ''}
    }
}


export default connect(mapState)(NewProduct)