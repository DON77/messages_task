import React from 'react';
import { render } from 'react-dom';
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import rootReducer from './store'
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker'

const store = createStore(rootReducer, composeWithDevTools(
    applyMiddleware(thunk)
))

render(
    <Provider store={store}>
        <App />
    </Provider>,
 document.getElementById('root'));
registerServiceWorker();
