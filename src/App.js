import React from 'react';
import {Provider} from 'react-redux';

import {AppContentWrapper} from './AppContentWrapper';
import store from 'state/store';

import './App.scss';

function App() {
    return (
        <Provider store={store}>
            <AppContentWrapper />
        </Provider>
    );
}

export default App;
