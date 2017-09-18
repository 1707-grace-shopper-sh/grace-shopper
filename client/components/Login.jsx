import React, { Component } from 'react'
import { connect } from 'react-redux'

function Login(props) {
	
	return (
		<div> Login
			<form name="login" onSubmit={props.submitLogin}>
				<label>Email</label>
				<input type="text" name="email" required />
				<label>Email</label>    
				<input type="text" name="email" required />
			</form>
			<button type='submit'>Login</button>
		</div>
	)
}

const mapState = null

const mapDispatch = dispatch => {
	return {
		submitLogin(event) {
			event.preventDefault()
			const loginDetails = {
				email: event.target.email.value,
				password: event.target.password.value
			}
			dispatch(loggingInUser(loginDetails))
		}
	}
}

export default connect(mapState, mapDispatch)(Login)