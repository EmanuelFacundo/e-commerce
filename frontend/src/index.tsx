import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import promise from 'redux-promise'
import thunk from 'redux-thunk'

import App from './App';
import rootReducer from './Reduce'

import { GlobalStyle } from './styles';

const store = applyMiddleware(thunk, promise)(createStore)(rootReducer)

ReactDOM.render(
  <Provider store={store}>
    <App/>
    <GlobalStyle/>
  </Provider>,
  document.getElementById('root')
);
