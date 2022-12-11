import {createStore, combineReducers} from 'redux';
import appState from './reducers';
import modalsSlice from "./slices/modals";
import screensSlice from "./slices/screens";
import toastsSlice from "./slices/toasts";

export default createStore(
    combineReducers({
        appState,
        modals: modalsSlice.reducer,
        screens: screensSlice.reducer,
        toasts: toastsSlice.reducer,
    })
);
