import React, { Component } from 'react'
import { connect } from 'react-redux'
import { loggingInUser } from '../reducer/user'
import {withRouter} from 'react-router'

function Login(props) { // Sh - Login is floating!? // OB - you could do type="password" to make the password dots
    return (
        <div> Login
            <form name="login" onSubmit={props.submitLogin}>
                <label>Email</label>
                <input
                    type="text"
                    name="email"
                    required
                />
                <label>Password</label>
                <input
                    type="text"
                    name="password"
                    required
                />
                <button type='submit'>Login</button>
            </form>
        </div>
    )
}


const mapProps = (dispatch, ownProps) => {
    console.log('ownProps', ownProps)    
    return {
        submitLogin(event) {
            event.preventDefault()
            const loginDetails = {
                email: event.target.email.value,
                password: event.target.password.value
            }
            dispatch(loggingInUser(loginDetails, ownProps.history))
        }
    }
}

export default withRouter(connect(null, mapProps)(Login))