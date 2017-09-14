import React, { Component } from 'react'
import { connect } from 'react-redux'
import { creatingUser } from '../reducer/usersReducer'

class CreateAccount extends Component {
  constructor(props) {
    super(props);
    this.state = {
      emailInput: "",
      passwordInput: ""
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(event) {
    switch (event.target.name) {
      case "email": return this.setState({ emailInput: event.target.value })
      case "password": return this.setState({ passwordInput: event.target.value })
    }
  }

  handleSubmit(event) {
    console.log('here I am')

    event.preventDefault();
    const user = {
      email: this.state.emailInput,
      password: this.state.passwordInput
    }

    this.props.creatingUser(user)
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label>
            Email:
          <input type="text" name="email" onChange={this.handleChange} value={this.state.emailInput} />
          </label>
          <label>
            Password:
          <input type="text" name="password" onChange={this.handleChange} value={this.state.passwordInput} />
          </label>
          <input type="submit" value="Submit" />
        </form>
        <a href='api/google'>Login with Google</a>
      </div>
    )
  }
}

const mapStateToProps = (props) => {
  return {};
}
const mapDispatchToProps = (dispatch) => {
  return {
    creatingUser: function (user) {
      dispatch(creatingUser(user))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateAccount)