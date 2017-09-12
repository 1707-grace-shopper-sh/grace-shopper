import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

function NewProduct (props){
    return (
        <div>
            <h2>Enter new product information</h2>
            <form>
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
                <select>
                    {/* hardcoded the few categories we have. If we want categories to be dynamic, we will have to chnge this */}
                     {props.categories.map(category => {
                        return (
                             <option>{category}</option> 
                        )
                    })} 
                </select>
            </form>
        </div>
    )
}

const mapState = function(state){
    return {
        categories: ['Seafood', 'Candy', 'Condiments & Seasonings', 'Tea & Beverages']
    }
}


export default connect(mapState)(NewProduct)