import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { editProduct } from '../reducer/products';

class EditProduct extends Component {

    constructor(props) {
        super(props)
        this.state = {
            title: props.product.title,
            description: props.product.description,
            price: props.product.price,
            imUrl: props.product.imUrl,
            inventory: props.product.inventory,
            category: props.product.category
        }
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }

    componentWillReceiveProps(newProps){
        this.setState(newProps.product)
    }

    handleSubmit(event) {
        event.preventDefault();
        this.props.submitNewProduct(this.state)
    }

    handleChange(event) {
        const field = event.target.name;
        const content = event.target.value;
        this.setState({[field]: content})
    }

    render() {
        return (
            <div>
                <h2>Edit this product's information</h2>
                <form onSubmit={this.handleSubmit}>
                    <label>title:</label>
                    <input
                        name='title'
                        type='text'
                        value={this.state.title}
                        onChange={this.handleChange}
                        required
                    />
                    <label>description:</label>
                    <input
                        name='description'
                        type='text'
                        value={this.state.description}
                        onChange={this.handleChange}
                        required
                    />
                    <label>price:</label>
                    <input
                        name='price'
                        type='number'
                        value={this.state.price}
                        onChange={this.handleChange}
                        required
                    />
                    <label>image URL:</label>
                    <input
                        name='imUrl'
                        type='text'
                        value={this.state.imUrl}
                        onChange={this.handleChange}
                        required
                    />
                    <label>inventory:</label>
                    <input
                        name='inventory'
                        type='number'
                        value={this.state.inventory}
                        onChange={this.handleChange}
                        required
                    />
                    <label>category:</label>
                    <select name='category' onChange={this.handleChange}>
                        {/* hardcoded the few categories we have. If we want categories to be dynamic, we will have to chnge this */}
                        {this.props.categories.map(category => {
                            if (category === this.props.product.category) {
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
}

const mapState = function (state, ownProps) {
    const prodId = ownProps.match.params.id //last part after params can change potentially depending on frontend router
    return {
        categories: ['Seafood', 'Candy', 'Condiments & Seasonings', 'Tea & Beverages'],
        product: state.products.find(product => product.id === +prodId) || { id: 0, title: '', description: '', price: 0, imURL: '', inventory: 0, category: '' }
    }
}

const mapDispatch = function (dispatch, ownProps) {
    return {
        submitNewProduct(state) {
            dispatch(editProduct(state, ownProps.match.params.id, ownProps.history))
        }
    }
}

export default connect(mapState, mapDispatch)(EditProduct)