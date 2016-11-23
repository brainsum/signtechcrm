import React, { Component } from 'react';
import Header from 'app/components/partials/Header';
import { BrowserRouter, Match, Miss } from 'react-router';
import HomePage from 'app/components/pages/HomePage';
import LoginPage from 'app/components/pages/LoginPage';
import RequestNewPasswordPage from 'app/components/pages/RequestNewPasswordPage';
import SetNewPasswordPage from 'app/components/pages/SetNewPasswordPage';
import RegistrationPage from 'app/components/pages/RegistrationPage';
import CompletedFormsPage from 'app/components/pages/CompletedFormsPage';
import UsersPage from 'app/components/pages/UsersPage';
import InvitePage from 'app/components/pages/InvitePage';
import MyAccountPage from 'app/components/pages/MyAccountPage';
import LogoutPage from 'app/components/pages/LogoutPage';
import NotAllowedPage from 'app/components/pages/NotAllowedPage';
import NotFoundPage from 'app/components/pages/NotFoundPage';
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
                <Match pattern="/completed-forms/:page?" component={CompletedFormsPage} />
                <Match pattern="/users" component={UsersPage} />
                <Match pattern="/invite" component={InvitePage} />
                <Match pattern="/my-account" component={MyAccountPage} />
                <Match pattern="/logout" component={LogoutPage} />
                <Match pattern="/not-allowed" component={NotAllowedPage} />
                <Miss component={NotFoundPage} />
            </div>
        </BrowserRouter>
        <Footer />
    </div>
);