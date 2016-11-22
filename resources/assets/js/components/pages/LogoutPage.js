import React, { Component } from 'react';
import { connect } from 'react-redux';
import { logout } from 'app/ducks/auth';
import auth from 'app/components/utils/auth';

let LogoutPage = ({ logout }) => {
    logout();
    return null;
}

LogoutPage = connect(null, { logout })(LogoutPage);
LogoutPage = auth(LogoutPage);

export default LogoutPage;