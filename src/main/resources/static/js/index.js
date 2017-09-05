import React from 'react';
import ReactDOM from 'react-dom';
import AppContainer from './containers/AppContainer';
import { createStore } from 'redux';
import terminalManagerApp from './reducers';
import { Provider } from 'react-redux';

let store = createStore(terminalManagerApp);

ReactDOM.render(
    <Provider store={store}>
        <AppContainer />
    </Provider>, document.getElementById('container'));
