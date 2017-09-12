import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './reducer';
import '../scss/index.scss';
import { BrowserRouter as Router } from 'react-router-dom';


import NewProduct from './components/NewProduct.jsx'

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <NewProduct />
    </Router>
  </Provider>,
  document.getElementById('app')
)