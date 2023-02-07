import React, {useCallback, useMemo} from 'react';
import {Nav, Navbar, Dropdown} from 'react-bootstrap';
import {Gear} from 'react-bootstrap-icons';
import {useHistory} from 'react-router-dom';
import {connect, useDispatch} from 'react-redux';
import _ from 'lodash';

import Cookie from 'services/cookies/Cookie';
import {ResponsiveLayout} from 'components/responsive-layout/ResponsiveLayout';

import {ACTION_TYPES} from 'state/actions';
import {PAGES} from 'configs/routes';

import './Navigation.scss';

const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
    <div
        className="clickable"
        ref={ref}
        onClick={(e) => {
            e.preventDefault();
            onClick(e);
        }}
    >
        <Gear color="royalblue" size={24} />
    </div>
));

function Navigation(props) {
    const dispatch = useDispatch();
    let history = useHistory();

    const handleRedirect = useCallback(
        (page) => {
            history.push(page);
        },
        [history]
    );

    const signOut = useCallback(
        () => {
            Cookie.deleteCookie('AUTH');
            dispatch({type: ACTION_TYPES.SET_USER, payload: ''})

            handleRedirect(PAGES.landingPage);
        },
        [dispatch, handleRedirect]
    );

    const navigationContent = useMemo(
        () => {
            return _.isEmpty(props.userData)
                ? (
                    <React.Fragment>
                        <div onClick={() => handleRedirect(PAGES.register)} className="menu-item">Register</div>
                        <div onClick={() => handleRedirect(PAGES.login)} className="menu-item outlined">Login</div>
                    </React.Fragment>
                ) : (
                    <React.Fragment>
                        <div className="mr-3">Welcome, {props.userData.name}!</div>
                        <ResponsiveLayout
                            breakpoint={986}
                            renderDesktop={() => (
                                <React.Fragment>
                                    <Dropdown drop={'left'}>
                                        <Dropdown.Toggle as={CustomToggle} id="dropdown-custom-components" />
                                        <Dropdown.Menu>
                                            <Dropdown.Item onClick={() => handleRedirect(PAGES.user)}>My Profile</Dropdown.Item>
                                            <Dropdown.Item onClick={signOut}>Sign out</Dropdown.Item>
                                        </Dropdown.Menu>
                                    </Dropdown>
                                </React.Fragment>
                            )}
                            renderMobile={() => (
                                <React.Fragment>
                                    <Nav.Link onClick={() => handleRedirect(PAGES.user)}>My Profile</Nav.Link>
                                    <Nav.Link onClick={signOut}>Sign out</Nav.Link>
                                </React.Fragment>
                            )}
                        />
                    </React.Fragment>
                );
        },
        [props.userData, handleRedirect, signOut]
    )

    return (
        <Navbar variant="dark" expand="lg">
            <div onClick={() => handleRedirect(PAGES.landingPage)} className="brand-name">Family<span>Management</span></div>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="ml-auto">
                    {navigationContent}
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    )
}

const mapStateToProps = (state) => ({
    userData: state.appState.userData
});

// eslint-disable-next-line
Navigation = connect(mapStateToProps, null)(Navigation);
export {Navigation};
