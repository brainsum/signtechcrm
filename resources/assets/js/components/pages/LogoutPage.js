import React, { Component } from 'react';
import { connect } from 'react-redux';
import { logout } from 'app/ducks/auth';
import { Redirect } from 'react-router';

class LogoutPage extends Component {
    constructor(props) {
        super(props);

        this.props.dispatch(logout());
    }

    render() {
        return <Redirect to="/login" />;
    }
}

export default connect()(LogoutPage);