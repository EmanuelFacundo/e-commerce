import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import promise from 'redux-promise'
import thunk from 'redux-thunk'

import App from './App';
import rootReducer from './Reduce'

import './styles.scss'

const store = applyMiddleware(thunk, promise)(createStore)(rootReducer)

ReactDOM.render(
  <Provider store={store}>
    <App/>
  </Provider>,
  document.getElementById('root')
);
