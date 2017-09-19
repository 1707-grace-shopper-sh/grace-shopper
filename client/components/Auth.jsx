import React from 'react'
import CreateAccount from './CreateAccount.jsx'
import Login from './Login.jsx'

export default function Auth(){
    return (
        <div className="container">
            <div className="row">
                <div className="col-md-12">
                	<div className="product-content-right"> 
                		<div className="col-md-5">
				            <Login />       
	             		</div>
	             		<div className="col-md-1"> </div>
	             		<div className="col-md-5">
	             			<CreateAccount/>
	             		</div>
	             		<div className="col-md-1"> </div>
             		</div>
                </div>
            </div>
        </div>
    )
}