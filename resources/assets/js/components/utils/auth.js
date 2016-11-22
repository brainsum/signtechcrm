import React, { Component } from 'react';
import { Redirect } from 'react-router';
import { connect } from 'react-redux';

function mapStateToProps(state) {
    return {
        isLoggedIn: state.auth.isLoggedIn,
        isAdmin: state.auth.user && state.auth.user.isAdmin
    };
}

/**
 * Creates a wrapped component that handles authentication based redirects
 *
 * @param {Component} Component to be wrapped
 * @param {object} authentication config (defaults to empty object)
 *   login: whether the user should be logged in to see this component (defaults to true)
 *   admin: whether the user should be an admin to see this component (defaults to false)
 */
export default (Component, {
    login = true,
    admin = false
} = {}) => {
    // The wrapped component
    const Auth = ({
        isLoggedIn,
        isAdmin,
        ...props
    }) => {
        if (isLoggedIn) {
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

        // Render the component if authentication is ok
        return <Component {...props} />; 
    }

    return connect(mapStateToProps)(Auth);
}