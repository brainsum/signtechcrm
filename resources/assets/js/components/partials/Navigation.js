import React, { Component } from 'react';
import { Link } from 'react-router';

export default class Navigation extends Component {
    render() {
        const items = [
            { to: '/login', title: 'Log in' },
            { to: '/registration', title: 'Registration' }
        ];
        let index = 0;

        return (
            <ul className="nav">
                {items.map(item => (
                    <li key={index++} className="nav__item">
                        <Link className="nav__link" to={item.to} activeClassName="nav__link--active">
                            {item.title}
                        </Link>
                    </li>
                ))}
            </ul>
        );
    }
}