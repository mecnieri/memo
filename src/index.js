import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

// redux
import {createStore} from 'redux'
import {Provider} from 'react-redux'
import rootReducer from './reducers/rootReducer'

// redux store 
const store = createStore(rootReducer);


ReactDOM.render(<Provider store={store} ><App /></Provider>, document.getElementById('root'));

serviceWorker.unregister();
