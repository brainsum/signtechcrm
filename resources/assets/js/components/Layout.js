import React, { Component } from 'react';
import Header from 'app/components/partials/Header';
import { BrowserRouter, Match } from 'react-router';
import HomePage from 'app/components/pages/HomePage';
import LoginPage from 'app/components/pages/LoginPage';
import RequestNewPasswordPage from 'app/components/pages/RequestNewPasswordPage';
import SetNewPasswordPage from 'app/components/pages/SetNewPasswordPage';
import RegistrationPage from 'app/components/pages/RegistrationPage';
import MyCompletedFormsPage from 'app/components/pages/MyCompletedFormsPage';
import LogoutPage from 'app/components/pages/LogoutPage';
import Footer from 'app/components/partials/Footer';

export default () => (
    <div>
        <BrowserRouter>
            <div>
                <Header />

                <Match exactly pattern="/" component={HomePage} />
                <Match pattern="/login" component={LoginPage} />
                <Match pattern="/request-new-password" component={RequestNewPasswordPage} />
                <Match pattern="/user/reset/:userId/:timestamp/:hashedPassword" component={SetNewPasswordPage} />
                <Match pattern="/registration" component={RegistrationPage} />
                <Match pattern="/my-completed-forms/:page?" component={MyCompletedFormsPage} />
                <Match pattern="/logout" component={LogoutPage} />
            </div>
        </BrowserRouter>
        <Footer />
    </div>
);