import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import updateProduct from '../reducer/product';

function NewProduct (props){
    let localState = {
        title: props.product.title,
        description: props.product.description,
        price: props.product.price,
        imURL: props.product.imURL,
        inventory: props.product.inventory,
        category: props.product.category
    };
    console.log('props: ', props)
    return (
        <div>
            <h2>Edit this product's information</h2>
            <form onSubmit={props.submitNewProduct}>
                <label>title:</label>
                <input 
                    name='title'
                    type='text'
                    defaultValue={localState.title}
                    required
                />
                <label>description:</label>
                <input 
                    name='description'
                    type='text'
                    defaultValue={localState.description}
                    required
                />
                <label>price:</label>
                <input 
                    name='price'
                    type='number'
                    defaultValue={localState.price}
                    required
                />
                <label>image URL:</label>
                <input 
                    name='imageURL'
                    type='text'
                    defaultValue={localState.imURL}
                    required
                />
                <label>inventory:</label>
                <input 
                    name='inventory'
                    type='number'
                    defaultValue={props.product.inventory}
                    required
                />
                <label>category:</label>
                <select name='category'>
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
    console.log('state from mapstate :', state)
    const prodId = ownProps.match.params.id //last part after params can change potentially depending on frontend router
    return {
        categories: ['Seafood', 'Candy', 'Condiments & Seasonings', 'Tea & Beverages'],
        product: state.products.find(product => product.id === +prodId) || { id: 0, title: '', description: '', price: 0, imURL: '', inventory: 0, category: ''}
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
            dispatch(updateProduct(newProductDetails, ownProps.history))
        }
        handleChange(event){
            
        }
    }
}

export default connect(mapState, mapDispatch)(NewProduct)