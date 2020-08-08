import 'materialize-css/dist/css/materialize.min.css'
//import "antd/dist/antd.css"
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { createStore,compose, applyMiddleware } from 'redux'
import reduxThunk from 'redux-thunk'

import App from './components/App'
import reducers from './reducers'
import axios from 'axios'
window.axios = axios

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  reducers,
  composeEnhancer(applyMiddleware(reduxThunk))
  )

ReactDOM.render(
  <Provider store={store}>
     <App />
  </Provider>,
  document.getElementById('root'));

//console.log(process.env.REACT_APP_STRIPE_KEY, process.env.NODE_ENV)