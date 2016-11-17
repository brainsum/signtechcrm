import React from 'react';
import { Redirect } from 'react-router';
import { connect } from 'react-redux';

const AuthRedirect = ({
    loggedIn,
    login,
    admin = false,
    isAdmin
}) => {
    if (loggedIn) {
        if (!login) {
            return <Redirect to="/completed-forms" />;
        }
        if (admin && !isAdmin) {
            return <Redirect to="/not-allowed" />;
        }
    }
    else {
        if (login) {
            return <Redirect to="/login" />
        }
    }

    return null;
};

function mapStateToProps(state) {
    return {
        loggedIn: state.auth.loggedIn,
        isAdmin: state.auth.user && state.auth.user.isAdmin
    };
}

export default connect(mapStateToProps)(AuthRedirect);

