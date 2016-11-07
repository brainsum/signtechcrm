import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';

class Navigation extends Component {
    render() {
        let items;

        if (this.props.loggedIn) {
            items = [
                { to: '/my-forms', title: 'My forms' },
                { to: '/my-completed-forms', title: 'My completed forms' },
                { to: '/users', title: 'Users' },
                { to: '/logout', title: 'Logout' }
            ];
        }
        else {
            items = [
                { to: '/login', title: 'Log in' },
                { to: '/registration', title: 'Registration' }
            ];
        }

        return (
            <div>
                <ul className="nav">
                    {items.map((item, index) => (
                        <li key={index} className="nav__item">
                            <Link
                                className="nav__link"
                                activeClassName="nav__link--active"
                                to={item.to}
                            >
                                {item.title}
                            </Link>
                        </li>
                    ))}
                </ul>

                <div className="nav-mobile">
                    <label className="nav-mobile__hamburger" htmlFor="hamburger">
                        <span></span>
                    </label>
                    <input
                        className="nav-mobile__checkbox"
                        id="hamburger"
                        type="checkbox"
                    />
                    <label className="nav-mobile__backdrop" htmlFor="hamburger"></label>
                    <ul className="nav-mobile__list">
                        {items.map((item, index) => (
                            <li key={index}>
                                <Link
                                    className="nav-mobile__link"
                                    activeClassName="nav-mobile__link--active"
                                    to={item.to}
                                >
                                    {item.title}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        loggedIn: state.auth.loggedIn
    }
}

export default connect(mapStateToProps)(Navigation);