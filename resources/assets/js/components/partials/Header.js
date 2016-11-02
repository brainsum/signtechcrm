import React, { Component } from 'react';
import Navigation from 'app/components/partials/Navigation';

export default () => (
    <header className="header container">
        <div className="header__inner">
            <div className="header__logo">SignTech & SQR logos</div>
            <div className="header__nav">
                <Navigation />
            </div>
        </div>
    </header>
);