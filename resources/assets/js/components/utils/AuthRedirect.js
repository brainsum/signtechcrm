import React from 'react';
import { Redirect } from 'react-router';
import { connect } from 'react-redux';

const AuthRedirect = ({
    loggedIn,
    login: shouldBeLoggedIn
}) => {
    if (shouldBeLoggedIn && !loggedIn) {
        return <Redirect to="/login" />
    }
    else if (!shouldBeLoggedIn && loggedIn) {
        return <Redirect to="/my-completed-forms" />
    }

    return null;
};

function mapStateToProps(state) {
    return { loggedIn: state.auth.loggedIn };
}

export default connect(mapStateToProps)(AuthRedirect);

