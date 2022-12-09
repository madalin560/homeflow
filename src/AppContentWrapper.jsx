import React, {useEffect, useMemo} from 'react';
import {
    BrowserRouter as Router,
    Route,
    Switch
} from 'react-router-dom';
import {connect, useDispatch} from 'react-redux';
import _ from 'lodash';

import Cookie from './services/cookies/Cookie';
import Endpoint from './services/api/endpoint';
import {ToastFactory} from './services/errors/ToastFactory';
import {Home} from './pages/home/Home';
import {Navigation} from './components/navigation/Navigation';
import {GuardedRoute} from './components/guarded-route/GuardedRoute';

import {ACTION_TYPES} from './state/actions';
import {ROUTES_CONFIG} from './configs/routes';
import ToastService from "./services/errors/ToastService";

function AppContentWrapper(props) {
    const dispatch = useDispatch();

    const routes = useMemo(
        () => ROUTES_CONFIG.map(({path, component, guarded}) => (
            guarded
                ? <GuardedRoute auth={props.userData} key={path} path={path} component={component} />
                : <Route key={path} path={path} component={component} />
        )),
        [props.userData]
    );

    useEffect(
        () => {
            if (Cookie.getCookieByName('AUTH')) {
                Endpoint.api.getUserData().then(response => {
                    dispatch({type: ACTION_TYPES.SET_USER, payload: response})
                });
            }
        },
        [dispatch]
    );

    setInterval(function() {
        const time = Date.now();
        const expiredToasts = _.filter(props.toasts, (toast) => (
            time < toast.time + (10000 * 60)
        ));

        expiredToasts.forEach(toast => (
            ToastService.removeToast(toast.key)
        ))
    }, 5000);

    return (
        <Router>
            <Navigation />
            <ToastFactory toasts={props.toasts} />
            <div className="content-wrapper">
                <Switch>
                    <Route exact path="/" component={Home} />
                    {routes}
                </Switch>
            </div>
        </Router>
    );
}

const mapStateToProps = (state) => ({
    userData: state.appState.userData,
    toasts: state.appState.toasts
});

// eslint-disable-next-line
AppContentWrapper = connect(mapStateToProps, null)(AppContentWrapper);
export {AppContentWrapper};
