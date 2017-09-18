import React from 'react'
import CreateAccount from './CreateAccount.jsx'
import Login from './Login.jsx'

export default function Auth() {
    return (
        <div>  
            <Login />
            <CreateAccount/>
            <a href='/api/auth/google'>Login with Google</a>            
        </div>
    )
}