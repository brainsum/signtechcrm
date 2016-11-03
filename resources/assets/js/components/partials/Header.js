import React, { Component } from 'react';
import Navigation from 'app/components/partials/Navigation';

export default () => (
    <header className="header container">
        <div className="header__inner">
            <div className="header__logos">
                <img src="/img/sqr.jpg" alt="SQR Security Solutions" />
            </div>
            <div className="header__nav">
                <Navigation />
            </div>
        </div>
    </header>
);