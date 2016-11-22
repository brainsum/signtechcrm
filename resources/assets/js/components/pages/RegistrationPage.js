import React, { Component } from 'react';
import { connect } from 'react-redux';
import { registrate, clear } from 'app/ducks/registration';
import auth from 'app/components/utils/auth';

class RegistrationPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showValidationErrors: false
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(fieldName) {
        const value = this.refs[fieldName].value;
        let isValid = false;
        let message = null;

        switch(fieldName) {
            case 'firstName':
                isValid = !!value.length;
                message = isValid  ? null : 'Please provide a first name.';
                break;
            case 'lastName':
                isValid = !!value.length;
                message = isValid  ? null : 'Please provide a last name.';
                break;
            case 'email':
                isValid = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(value);
                message = isValid ? null : 'Please provide a valid e-mail address.';
                break;
            case 'password':
                isValid = value.length > 5
                message = isValid ? null : 'Password must be at least 6 characters long.';
                break;
            case 'passwordRepeat':
                isValid = this.state.password && this.state.password.value === value;
                message = isValid ? null : 'Password confirmation does not match the Password field.'
                break;
        }

        this.setState({
            [fieldName]: {
                value,
                isValid,
                message
            }
        });
    }

    handleSubmit(e) {
        e.preventDefault();
        
        const data = {};
        let hasError = false;
        ['firstName', 'lastName', 'email', 'password', 'passwordRepeat'].forEach(fieldName => {
            const fieldState = this.state[fieldName];

            if (!fieldState) {
                this.handleChange(fieldName);
                hasError = true;
                return;
            }
            
            if (!fieldState.isValid){
               hasError = true;
               return;
            }

            data[fieldName] = fieldState.value;
        });

        if (hasError) {
            this.setState({
                showValidationErrors: true
            });
        }
        else {
            this.props.registrate(data);
        }
    }

    hasError(fieldName) {
        return this.state.showValidationErrors && this.state[fieldName] && !this.state[fieldName].isValid; 
    }

    componentWillUnmount() {
        this.props.clear();
    }

    render() {
        return (
            <form className="container" onSubmit={this.handleSubmit}>
                <h1 className="page-title">Registration</h1>

                <div className="row">
                    <div className="col-md-6 offset-md-3 col-lg-4 offset-lg-4">
                        {this.renderInput('firstName', 'First name', 'First name')}
                        {this.renderInput('lastName', 'Last name')}
                        {this.renderInput('email', 'E-mail', 'email')}
                        {this.renderInput('password', 'Password', 'password')}
                        {this.renderInput('passwordRepeat', 'Confirm password', 'password')}

                        <button className="btn btn-primary btn-block">
                            {this.props.isLoading ? 'Loading...' : 'Registrate'}
                        </button>

                        {this.renderResult()}
                    </div>
                </div>
            </form>
        );
    }

    renderInput(fieldName, label, type = 'text') {
        return (
            <div className={`form-group${this.hasError(fieldName) ? ' has-danger' : ''}`}>
                <label className="form-control-label" htmlFor={fieldName}>{label}</label>
                <input
                    className="form-control"
                    ref={fieldName}
                    id={fieldName}
                    name={fieldName}
                    type={type}
                    value={this.state[fieldName] ? this.state[fieldName].value : ''}
                    onChange={e => this.handleChange(fieldName)}
                />
                {this.renderError(fieldName)}
            </div>
        );
    }

    renderError(fieldName) {
        if (this.hasError(fieldName)) {
            return (
                <strong className="form-control-feedback">{this.state[fieldName].message}</strong>
            );
        }

        return null;
    }

    renderResult() {
        const { success, message } = this.props;

        if (success !== null) {
            return (
                <div className={`mt-1 alert alert-${success ? 'success' : 'danger'}`}>
                    {message}
                </div>
            );
        }

        return null;
    }
}

function mapStateToProps(state) {
    const { isLoading, success, message } = state.registration;
    return { isLoading, success, message };
}

RegistrationPage = connect(mapStateToProps, { registrate, clear })(RegistrationPage);
RegistrationPage = auth(RegistrationPage, { login: false});
export default RegistrationPage;