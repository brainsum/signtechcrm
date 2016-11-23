import React, { Component } from 'react';

export default class UserDetailsPage extends Component {
    constructor(props) {
        super(props);

        this.passwordRequired = false;

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e, callback) {
        const state = {};

        ['firstName', 'lastName', 'email', 'phone', 'password', 'passwordRepeat'].forEach(fieldName => {
            const field = this.refs[fieldName];

            if (field) {
                const value = field.value;

                switch (fieldName) {
                    case 'firstName':
                        state[fieldName] = {
                            value,
                            isValid: !!value.length,
                            message: 'Please provide first name'
                        };
                        break;
                    case 'lastName':
                        state[fieldName] = {
                            value,
                            isValid: !!value.length,
                            message: 'Please provide last name'
                        };
                        break;
                    case 'email':
                        state[fieldName] = {
                            value,
                            isValid: /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(value),
                            message: 'Please provide a valid e-mail address'
                        };
                        break;
                    case 'phone':
                        state[fieldName] = {
                            value,
                            isValid: true
                        };
                        break;
                    case 'password':
                        state[fieldName] = {
                            value,
                            isValid: (!this.passwordRequired && !value) || value.length > 5,
                            message: 'Password must be at least 6 characters long.'
                        };
                        break;
                    case 'passwordRepeat':
                        const password = this.refs.password.value;
                        state[fieldName] = {
                            value,
                            isValid: (!this.passwordRequired && !password) || password === value,
                            message: 'Password confirmation does not match the Password field.'
                        };
                        break;
                }
            }
        });

        this.setState(state, callback);
    }

    hasError(fieldName) {
        return this.state.showValidationErrors && this.state[fieldName] && !this.state[fieldName].isValid; 
    }

    renderInputs(phone = false, passwordLabel = 'Password') {
        return (
            <div>
                {this.renderInput('firstName', 'First name')}
                {this.renderInput('lastName', 'Last name')}
                {this.renderInput('email', 'E-mail', 'email')}
                {phone ? this.renderInput('phone', 'Phone', 'phone') : null}
                {this.renderInput('password', passwordLabel, 'password')}
                {this.renderInput('passwordRepeat', 'Confirm password', 'password')}
            </div>
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
                    onChange={this.handleChange}
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