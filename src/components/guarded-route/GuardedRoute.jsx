import React from 'react';
import {Route} from 'react-router-dom';
import {Home} from 'pages/home/Home';

const GuardedRoute = ({component, auth, ...rest}) => {
    const routeContent = auth
        ? component
        : Home;

    return <Route {...rest} component={routeContent}/>
};

export {GuardedRoute};
