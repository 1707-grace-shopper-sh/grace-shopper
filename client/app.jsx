import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './reducer';
import AllProducts from './components/AllProducts.jsx';
import '../scss/index.scss';
// import { BrowserRouter as Router } from 'react-router-dom';

ReactDOM.render(
  <Provider store={store}>
 	{/*Router*/}
    	<AllProducts />
 	{/*/Router*/}
  </Provider>,
  document.getElementById('app')
);