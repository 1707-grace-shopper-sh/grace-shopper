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
                    <option>dummy category 1</option>
                    <option>dummy category 2</option>
                    {/* need to somehow map categories to props from state */}
                    {/* {props.categories.map(category => {
                        return (
                            <option key={category.id} value={category.id}>{category.name}</option>
                        )
                    })} */}
                </select>
            </form>
        </div>
    )
}