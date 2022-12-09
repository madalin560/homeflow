import {createStore, combineReducers} from 'redux';
import appState from './reducers';

export default createStore(
    combineReducers({appState})
);
