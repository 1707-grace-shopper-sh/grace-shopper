import React from 'react';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

class Searchbar extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			input: ''
		}

		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleChange(event) {
		const input = event.target.value;
		this.setState({input: input});
	}

	handleSubmit(event) {
		event.preventDefault();
		const product = event.target.product.value;
		this.setState({input: ''});
		event.target.reset();
		this.props.history.push(`/search?product=${product}`);
	}

	render() {
		return (
				<form className="form-horizontal" noValidate name="productSearch" onSubmit={this.handleSubmit}>
						<label htmlFor="search" className="col-xs-2 control-label">Search</label>
							<input name="product" onChange={this.handleChange} className="form-control" placeholder="Enter product name"/>
			    </form>
		)
	}
}

const mapState = null;

const mapDispatch = null;

// DON'T REMOVE THIS ONE :)
export default withRouter(connect(mapState, mapDispatch)(Searchbar));