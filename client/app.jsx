import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './reducer';
import '../scss/index.scss';
// import { BrowserRouter as Router } from 'react-router-dom';

ReactDOM.render(
  <Provider store={store}>
 	{/*Router*/}
    	<div>Hello, world!</div>
 	{/*/Router*/}
  </Provider>,
  document.getElementById('app')
);