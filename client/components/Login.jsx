import React, { Component } from 'react'
import { connect } from 'react-redux'
import { loggingInUser } from '../reducer/user'
import {withRouter} from 'react-router'

function Login(props) {
    return (
            <div className="submit-review">
                <h2 className="sidebar-title">Login</h2>
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
                    <div id="login-buttons">
                        <button type='submit'>Login</button>
                        <a href='/api/auth/google'><img id="google-button" src="https://www.theorgwiki.com/static/orgwiki/img/login-button-google.899dbdb72597.png"/></a>
                    </div>
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