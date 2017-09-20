import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Tabs, Tab } from 'react-bootstrap';
import { withRouter } from 'react-router';
import { postCartEntry } from '../reducer/cart';
import WriteReview from './WriteReview.jsx'
import Reviews from './Reviews.jsx';

function SingleProduct(props) {

  const product = props.currentProduct;
  const options = [];
  // for select dropdown with quantity options (inspired by Amazon UI)
  for (var i = 1; i <= product.inventory; i++) {
    options.push(<option key={i}>{i}</option>);
  }

	function handleSubmit(event) {
		event.preventDefault();
		const id = product.id
    const quantity = event.target.quantity.value
    const userId = props.userId
		const cartEntry = {id, quantity, userId}
		props.addToCart(cartEntry);
	}

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-12">
          <div className="product-content-right">
            <div className="col-sm-3">
              <div className="product-images">
                <div className="product-main-img">
                  <img src={product.imUrl} alt />
                </div>
              </div>
            </div>
            <div className="col-sm-9">
              <div className="product-inner">
                <h2 className="product-name">{product.title}</h2>
                <div className="product-inner-price">
                  <ins>${Number.parseFloat(product.price).toFixed(2)}</ins>
                </div>
                <form name="cart" onSubmit={handleSubmit}>
                  <div className="cart-component">
                                                                                                                                                                                        Quantity ({product.inventory} remaining)
                  </div>


                  <div className="cart-component">
                    <select name="quantity" className="text qty"> {options} </select>
                  </div>
                  <div className="cart-component">
                    <button className="add_to_cart_button" type="submit">Add To Cart</button>
                  </div>
                </form>
                <div className="product-inner-category">
                  <p>Category: <Link to={`/filter?category=${product.category}`}>{product.category}</Link>. Tags: <a href>awesome</a>, <a href>best</a>, <a href>sale</a>, <a href>shoes</a>. </p>
                </div>
                <div>
                  {
                    props.isAdmin ? <Link to={`/product/${product.id}/edit`}><button>Edit</button></Link> : ""
                  }
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>


      <div className="row">
        <div className="col-md-12">
          <div role="tabpanel">
            <Tabs defaultActiveKey={1} id='products-and-reviews'>
              <Tab eventKey={1} title="Description">
                <div className="panel-container">
                  <h2>Product Description</h2>
                  <p>{product.description}</p>
                </div>
              </Tab>
              <Tab eventKey={2} title="Reviews">
                <div className="panel-container">
                  <Reviews prodId={product.id} />
                </div>
              </Tab>
              <Tab eventKey={3} title="Add Your Review">
                <div className="panel-container">
                  <WriteReview prodId={product.id} />
                </div>
              </Tab>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapState = (state, ownProps) => {
	// pull id off the url
	const id = ownProps.match.params.id;
	function thisId(product) {
		return product.id == +id;
	}
	// find that element in the products on state
	const idx = state.products.findIndex(thisId);
	return {
		currentProduct: state.products[idx] || { id: 0, title: '', description: '', price: 0, imURL: '', inventory: 0, category: '' },
    prodId: +id, 
    userId: state.currentUser.id,
    isAdmin: state.currentUser.isAdmin 
	}
};

const mapDispatch = (dispatch) => { 
	return {
		addToCart: function(cartEntry) {
			const cartThunk = postCartEntry(cartEntry)
			dispatch(cartThunk)
		}
	}
};


export default connect(mapState, mapDispatch)(SingleProduct);