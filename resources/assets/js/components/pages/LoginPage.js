import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import { login, readApiJwt } from 'app/actions/auth';

class LoginPage extends Component {
    constructor(props) {
        super(props);

        this.handleLogin = this.handleLogin.bind(this);
    }

    handleLogin(e) {
        e.preventDefault();

        this.props.dispatch(login(
            this.refs.email.value,
            this.refs.password.value
        )).then(() => {
            this.props.dispatch(readApiJwt());
        });
    }

    render() {
        if (this.props.loggedIn) {
            return <Redirect to='/my-forms' />;
        }

        return (    
            <div className="container">
                <h1 className="page-title">Log in</h1>

                <form className="row" onSubmit={this.handleLogin}>
                    <div className="col-md-6 offset-md-3 col-lg-4 offset-lg-4">
                        <div className="form-group">
                            <label htmlFor="email">E-mail</label>
                            <div className="input-group">
                                <input
                                    className="form-control"
                                    id="email"
                                    type="email"
                                    ref="email"
                                    required
                                />
                            </div>
                        </div>

                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <div className="input-group">
                                <input
                                    className="form-control"
                                    id="password"
                                    type="password"
                                    ref="password"
                                    required
                                />
                            </div>
                        </div>

                        <button
                            className="btn btn-primary btn-block"
                            disabled={this.props.loading}
                        >
                            {this.props.loading ? 'Logging in ...' : 'Login'}
                        </button>

                        {this.renderError()}
                    </div>
                </form>
            </div>
        );
    }

    renderError() {
        if (this.props.error) {
            return (
                <div className="alert alert-danger mt-1">
                    {this.props.error}
                </div>
            );
        }
        else {
            return null;
        }
    }
}

function mapStateToProps(state) {
    return {
        loggedIn: state.auth.loggedIn,
        loading: state.auth.loading,
        error: state.auth.error
    }
}

export default connect(mapStateToProps)(LoginPage);