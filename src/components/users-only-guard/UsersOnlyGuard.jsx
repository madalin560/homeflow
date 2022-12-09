import {connect} from 'react-redux';
import _ from 'lodash';

function UsersOnlyGuard({children, userData}) {
    return !_.isEmpty(userData) && children;
}

const mapStateToProps = (state) => ({
    userData: state.appState.userData
});

// eslint-disable-next-line
UsersOnlyGuard = connect(mapStateToProps, null)(UsersOnlyGuard);
export {UsersOnlyGuard};
