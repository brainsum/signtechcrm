import React, { Component } from 'react';
import AuthRedirect from 'app/components/utils/AuthRedirect';

export default class RegistrationPage extends Component {
    render() {
        return (
            <div className="container">
                <AuthRedirect login={false} />
                
                <h1 className="page-title">Registration</h1>

                <div className="row">
                    <div className="col-md-6 offset-md-3 col-lg-4 offset-lg-4">
                        <div className="form-group">
                            <label htmlFor="firstname">First name</label>
                            <div className="input-group">
                                <input className="form-control" id="firstname" name="firstname" type="text" />
                            </div>
                        </div>

                        <div className="form-group">
                            <label htmlFor="lastname">Last name</label>
                            <div className="input-group">
                                <input className="form-control" id="lastname" name="lastname" type="text" />
                            </div>
                        </div>

                        <div className="form-group">
                            <label htmlFor="email">E-mail</label>
                            <div className="input-group">
                                <input className="form-control" id="email" name="email" type="email" />
                            </div>
                        </div>

                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <div className="input-group">
                                <input className="form-control" id="password" name="password" type="password" />
                            </div>
                        </div>

                        <div className="form-group">
                            <label htmlFor="password-repeat">Confirm password</label>
                            <div className="input-group">
                                <input className="form-control" id="password-repeat" name="password-repeat" type="password" />
                            </div>
                        </div>

                        <button className="btn btn-primary btn-block">Register</button>
                    </div>
                </div>
            </div>
        );
    }
}