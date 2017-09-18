import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

function Footer(props) {
	
	const categories = props.categories

	return (
		<div className="footer-top-area">
			<div className="zigzag-bottom" />
				<div className="container">
		  			<div className="row">
						<div className="col-md-3 col-sm-6">
			  				<div className="footer-about-us">
								<h2>Grace's Gourmet Goods</h2>
								<p>A gourmet foods store built by three senior students at The Grace Hopper Program and very, very loosely inspired by the remarkable Rear Admiral Dr. Grace Murray Hopper.</p>
								<div className="footer-social">
				  					<a href="/" target="_blank"><i className="fa fa-facebook" /></a>
									<a href="/" target="_blank"><i className="fa fa-twitter" /></a>
									<a href="/" target="_blank"><i className="fa fa-youtube" /></a>
									<a href="/" target="_blank"><i className="fa fa-linkedin" /></a>
								</div>
			  				</div>
						</div>
						<div className="col-md-3 col-sm-6">
			 				<div className="footer-menu">
								<h2 className="footer-wid-title">User Navigation </h2>
								<ul>
									<li><a href>My account</a></li>
									<li><a href>Order history</a></li>
									<li><a href>Wishlist</a></li>
									<li><a href>Vendor contact</a></li>
									<li><a href>Front page</a></li>
								</ul>                        
			  				</div>
						</div>
						<div className="col-md-3 col-sm-6">
			  				<div className="footer-menu">
								<h2 className="footer-wid-title">Categories</h2>
								<ul>
								{
		                			categories.map((category, idx) => {
		                				return <li key={idx}><Link to={`/filter?category=${category}`}>{category}</Link></li>
		                			})
		                		}
								</ul>                        
			  				</div>
						</div>
						<div className="col-md-3 col-sm-6">
			 				<div className="footer-newsletter">
								<h2 className="footer-wid-title">Newsletter</h2>
								<p>Sign up to our newsletter and get exclusive deals you wont find anywhere else straight to your inbox!</p>
								<div className="newsletter-form">
									<input type="email" placeholder="Type your email" />
									<input type="submit" defaultValue="Subscribe" />
								</div>
			  				</div>
						</div>
		  			</div>
				</div>
	  		</div>
	)
}

const mapState = function (state) {
	return {
		categories: state.categories
	}
}

export default connect(mapState)(Footer)