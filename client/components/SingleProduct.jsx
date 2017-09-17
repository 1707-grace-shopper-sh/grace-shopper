import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router';
import Reviews from './Reviews.jsx';

function SingleProduct(props) {

	const product = props.currentProduct;
	
	return (
		<div className="container">

		<div className="row">
		<div className="col-md-12">
            <div className="product-content-right">
                        {/*<div class="product-breadcroumb">
                            <a href="">Home</a>
                            <a href="">Category Name</a>
                            <a href="">Sony Smart TV - 2015</a>
                        </div>*/}

        <div className="col-sm-3">
          <div className="product-images">
            <div className="product-main-img">
              <img src="img/product-2.jpg" alt />
            </div>
          </div>
        </div>
        <div className="col-sm-9">
          <div className="product-inner">
            <h2 className="product-name">{product.title}</h2>
            <div className="product-inner-price">
              <ins>${Number.parseInt(product.price).toFixed(2)}</ins>
            </div>    
            <form action className="cart">
              <div className="quantity">
                <input type="number" size={4} className="input-text qty text" title="Qty" defaultValue={1} name="quantity" min={1} step={1} />
              </div>
             
              <button className="add_to_cart_button" type="submit">Add to cart</button>
            </form>   
            <div className="product-inner-category">
              <p>Category: <a href>Summer</a>. Tags: <a href>awesome</a>, <a href>best</a>, <a href>sale</a>, <a href>shoes</a>. </p>
            </div>
          </div>
        </div>
      </div>
      </div>
      </div>

      <div className="row">
      	<div className="col-md-12">
      		<div role="tabpanel">
              <ul className="product-tab" role="tablist">
                <li role="presentation" className="active"><a href="#home" aria-controls="home" role="tab" data-toggle="tab">Description</a></li>
                <li role="presentation"><a href="#profile" aria-controls="profile" role="tab" data-toggle="tab">Reviews</a></li>
              </ul>
              <div className="tab-content">
                <div role="tabpanel" className="tab-pane fade in active" id="home">
                  <h2>Product Description</h2>  
                  <p>{product.description}</p>
                </div>
                <div role="tabpanel" className="tab-pane fade" id="profile">
                  <h2>Reviews</h2>
                  <div className="submit-review">
                    <p><label htmlFor="name">Name</label> <input name="name" type="text" /></p>
                    <p><label htmlFor="email">Email</label> <input name="email" type="email" /></p>
                    <div className="rating-chooser">
                      <p>Your rating</p>
                      <div className="rating-wrap-post">
                        <i className="fa fa-star" />
                        <i className="fa fa-star" />
                        <i className="fa fa-star" />
                        <i className="fa fa-star" />
                        <i className="fa fa-star" />
                      </div>
                    </div>
                    <p><label htmlFor="review">Your review</label> <textarea name="review" id cols={30} rows={10} defaultValue={""} /></p>
                    <p><input type="submit" defaultValue="Submit" /></p>
                  </div>
                </div>
              </div>
            </div>
      	</div>
      </div>


		<div className="row">
			<div className="col-lg-6 col-md-6 col-s-12 col-xs-12">
				<p>{product.title}</p>
				<img className="card-img-top" src={product.imUrl} alt />
				<h5>Price: {product.price}</h5>
				<p className="card-text">{product.description}</p>
			</div>
			<div>
				<h3>Reviews</h3>
				<button><Link to={`/product/${product.id}/write-review`}>Review this product</Link></button>
				<Reviews prodId={props.prodId} />
			</div>
			<div className="col-lg-6 col-md-6 col-s-12 col-xs-12">
				<form action="#">
					Quantity
					  <input type="number" name="quantity" min="1" max={product.inventory} />
					<input type="submit" />
				</form>
			</div>
		</div>

		</div>
	);
};

const mapStateToProps = function (state, ownProps) {
	// pull id off the url
	const id = ownProps.match.params.id;
	function thisId(product) {
		return product.id == +id;
	}
	// find that element in the products on state
	const idx = state.products.findIndex(thisId);
	return {
		currentProduct: state.products[idx] || { id: 0, title: '', description: '', price: 0, imURL: '', inventory: 0, category: '' },
		prodId: +id
	}
};

const mapDispatchToProps = null;


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SingleProduct));