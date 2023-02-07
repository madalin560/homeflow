import {Register} from 'pages/register/Register';
import {Login} from 'pages/login/Login';
import {Dashboard} from 'pages/dashboard/Dashboard';
import {ResetPassword} from 'pages/reset-password/ResetPassword';
import {User} from 'pages/user/User';

const PAGES = {
    landingPage: '/',
    login: '/login',
    register: '/register',
    user: '/userInfo',
    dashboard: '/dashboard',
    resetPassword: '/resetPassword'
}

const ROUTES_CONFIG = [
    {
        path: PAGES.register,
        component: Register,
        guarded: false
    },
    {
        path: PAGES.login,
        component: Login,
        guarded: false
    },
    {
        path: PAGES.resetPassword,
        component: ResetPassword,
        guarded: false
    },
    {
        path: PAGES.dashboard,
        component: Dashboard
    },
    {
        path: PAGES.user,
        component: User,
        guarded: true
    }
];

export {
    PAGES,
    ROUTES_CONFIG
};
