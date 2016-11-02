import React, { Component } from 'react';

export default class LoginPage extends Component {
    render() {
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

                        <button className="btn btn-primary btn-block">Log In</button>
                    </div>
                </div>
            </div>
        );
    }
}