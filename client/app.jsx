import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './reducer';
import '../scss/index.scss';
import Main from './components/Main.jsx'
// import { BrowserRouter as Router } from 'react-router-dom';

ReactDOM.render(
  <Provider store={store}>
   {/*Router*/}

      <div>Hello, world!
        <Main />
      </div>
 	{/*/Router*/}
  </Provider>,
  document.getElementById('app')
);