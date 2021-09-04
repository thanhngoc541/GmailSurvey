import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'materialize-css/dist/css/materialize.min.css'
import App from './components/App';
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import reducers from './reducers';
import reducThunk from 'redux-thunk'

const store = createStore(reducers, {}, applyMiddleware(reducThunk));
ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>,
  document.getElementById('root')
);

console.log("process.env: ", process.env);
console.log('Stripe key: ', process.env.REACT_APP_STRIPE_KEY);
console.log("Environment: ", process.env.NODE_ENV);