import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';

class LoginPage extends Component {
    constructor(props) {
        super(props);

        this.handleLogin = this.handleLogin.bind(this);
    }

    handleLogin() {
        this.props.dispatch({ type: 'LOGIN' });
    }

    render() {
        console.log(this.props.loggedIn);
        if (this.props.loggedIn) {
            return <Redirect to='/my-forms' />;
        }

        return (
            <div className="container">
                <h1 className="page-title">Log in</h1>

                <div className="row">
                    <div className="col-md-6 offset-md-3 col-lg-4 offset-lg-4">
                        <div className="form-group">
                            <label htmlFor="email">E-mail</label>
                            <div className="input-group">
                                <input className="form-control" id="email" type="email" />
                            </div>
                        </div>

                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <div className="input-group">
                                <input className="form-control" id="password" type="password" />
                            </div>
                        </div>

                        <button className="btn btn-primary btn-block" onClick={this.handleLogin}>Log In</button>
                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        loggedIn: state ? state.loggedIn : false
    }
}

export default connect(mapStateToProps)(LoginPage);