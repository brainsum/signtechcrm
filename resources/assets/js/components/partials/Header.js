import React, { Component } from 'react';
import { Link } from 'react-router';
import Navigation from 'app/components/partials/Navigation';

export default () => (
    <header className="header container">
        <div className="header__inner">
            <div className="header__logos">
                <Link to="/">
                    <img src="/img/sqr.jpg" alt="SQR Security Solutions" />
                </Link>
            </div>
            <div className="header__nav">
                <Navigation />
            </div>
        </div>
    </header>
);