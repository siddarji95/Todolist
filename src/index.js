import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import App from './components/App/App'
import store from "./store";

store.subscribe(() => {
  console.log("Store updated!", store.getState());
});

ReactDOM.render(
  <Provider store = {store}>
      <App />
  </Provider>,
 document.getElementById('root')
)