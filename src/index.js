import React from 'react';
import ReactDom from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

import App from './components/App';
import reducers from './reducers';


// Create Redux Store
const store = createStore(reducers);

ReactDom.render(

    <Provider store={store}>
        <App />
    </Provider>,

    document.querySelector('#root')
);
