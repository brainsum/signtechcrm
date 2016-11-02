import React, { Component } from 'react';
import Header from 'app/components/partials/Header';
import { BrowserRouter, Match } from 'react-router';
import HomePage from 'app/components/pages/HomePage';
import LoginPage from 'app/components/pages/LoginPage';
import RegistrationPage from 'app/components/pages/RegistrationPage';
import Footer from 'app/components/partials/Footer';

export default () => (
    <div>
        <BrowserRouter>
            <div>
                <Header />

                <Match exactly pattern="/" component={HomePage} />
                <Match pattern="/login" component={LoginPage} />
                <Match pattern="/registration" component={RegistrationPage} />
            </div>
        </BrowserRouter>
        <Footer />
    </div>
);