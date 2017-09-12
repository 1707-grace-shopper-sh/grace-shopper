import React from 'react'
import axios from 'axios'

export default class AllProducts extends React.Component {

	constructor() {
		super()

		this.state = {
			products: []
		}
	}
	
	componentDidMount() {
		axios.get('/api/products')
		.then(response => response.data)
		.then(products => {
			this.setState({products: products});
		});
	}

	render() {

		return (
			<div className="row"> 
				{
				this.state.products.map((product, idx) => {
					return (
						<div key={idx} className="col-lg-4 col-md-6 mb-4">
							<div className="card h-100">
							<a href="#"><img className="card-img-top" src={product.imUrl} alt /></a>
							<div className="card-body">
								<h4 className="card-title">
									<a href="#">Title: {product.title}</a>
								</h4>
								<h5>Price: {product.price}</h5>
								<p className="card-text">{product.description.slice(0,100) + "..."}</p>
							</div>
							<div className="card-footer">
								<small className="text-muted">★ ★ ★ ★ ☆</small>
							</div>
							</div>
						</div>
					)
				})
				}
			</div>
		);
	}

}

module.exports = AllProducts;