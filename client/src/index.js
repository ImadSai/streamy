import React from 'react';
import ReactDom from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { composeWithDevTools } from 'redux-devtools-extension';

import App from './components/App';
import reducers from './reducers';

// Redux devtools
const composeEnhancers = composeWithDevTools(applyMiddleware())

// Create Redux Store
const store = createStore(
    reducers,
    composeEnhancers
);

ReactDom.render(

    <Provider store={store}>
        <App />
    </Provider>,

    document.querySelector('#root')
);
