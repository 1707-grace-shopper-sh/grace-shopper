import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './reducer';
import Main from './components/Main.jsx';
import '../scss/index.scss';
import { BrowserRouter as Router } from 'react-router-dom';
import Main from './components/Main.jsx'


import NewProduct from './components/NewProduct.jsx'

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <Main />
    </Router>
  </Provider>,
  document.getElementById('app')
)