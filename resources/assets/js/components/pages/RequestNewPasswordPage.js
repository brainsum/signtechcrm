import React, { Component } from 'react';
import { connect } from 'react-redux';
import auth from 'app/components/utils/auth';
import { request } from 'app/ducks/forgotPassword';

class RequestNewPasswordPage extends Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e) {
        e.preventDefault();
        this.props.request(this.refs.email.value);
    }

    render() {
        return (
            <div className="container">
                <h1 className="page-title">Request new password</h1>

                <form className="row" onSubmit={this.handleSubmit}>
                    <div className="col-md-6 offset-md-3 col-lg-4 offset-lg-4">
                        <div className="form-group">
                            <label htmlFor="email">E-mail</label>
                            <input
                                className="form-control"
                                id="email"
                                type="email"
                                ref="email"
                                required
                            />
                        </div>

                        <div className="form-group">
                            <button
                                className="btn btn-primary btn-block"
                                disabled={this.props.isLoading}
                            >
                                {this.props.isLoading ? 'Loading...' : 'Continue'}
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
                    An e-mail has been sent to {this.refs.email.value}.
                </div>
            )
        }
        else if (this.props.error) {
            return <div className="alert alert-danger">
                {this.props.error}
            </div>
        }

        return null;
    }
}

function mapStateToProps(state) {
    const { isLoading, success, error } = state.forgotPassword;
    return { isLoading, success, error };
}

RequestNewPasswordPage = connect(mapStateToProps, { request })(RequestNewPasswordPage);
RequestNewPasswordPage = auth(RequestNewPasswordPage, { login: false });
export default RequestNewPasswordPage;