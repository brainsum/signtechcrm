import React, { Component } from 'react';
import { connect } from 'react-redux';
import { set } from 'app/ducks/setNewPassword';
import { Link } from 'react-router';

class SetNewPasswordPage extends Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e) {
        e.preventDefault();

        const { userId, timestamp, hashedPassword } = this.props.params;
        const password = this.refs.password.value;

        this.props.dispatch(set({ userId, timestamp, hashedPassword, password }));
    }

    render() {
        return (
            <div className="container">
                <h1 className="page-title">Set new password</h1>

                <form className="row" onSubmit={this.handleSubmit}>
                    <div className="col-md-6 offset-md-3 col-lg-4 offset-lg-4">
                        <div className="form-group">
                            <label htmlFor="password">New password</label>
                            <input
                                className="form-control"
                                id="password"
                                type="password"
                                ref="password"
                                required
                            />
                        </div>

                        <div className="form-group">
                            <button
                                className="btn btn-primary btn-block"
                                disabled={this.props.isLoading}
                            >
                                {this.props.isLoading ? 'Saving...' : 'Save password'}
                            </button>
                        </div>

                        {this.renderResult()}
                    </div>
                </form>
            </div>
        );
    }

    renderResult() {
        if (this.props.success) {
            return (
                <div className="alert alert-success">
                    Your new password has been saved. Now you can <Link to="/login">login</Link> using your e-mail address and the new password.
                </div>
            )
        }
        else if (this.props.error) {
            return <div className="alert alert-danger">
                <strong>Error</strong>
                {this.props.error}
            </div>
        }

        return null;
    }
}

function mapStateToProps(state) {
    const { isLoading, success, error } = state.setNewPassword;
    return { isLoading, success, error };
}

export default connect(mapStateToProps)(SetNewPasswordPage);