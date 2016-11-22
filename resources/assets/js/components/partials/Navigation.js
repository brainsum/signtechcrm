import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';

class Navigation extends Component {
    render() {
        let items;

        if (this.props.isLoggedIn) {
            items = [
                { to: '/completed-forms', title: this.props.isAdmin ? 'Completed forms' : 'My completed forms' },
                /*{ to: '/my-account', title: 'My account' },*/
            ];

            if (this.props.isAdmin) {
                items.push(
                    { to: '/users', 'title': 'Users' },
                    { to: '/invite', title: 'Invite' }
                );
            }
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
                    {this.renderUser()}
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
                        {this.renderUser()}
                    </ul>
                </div>
            </div>
        );
    }

    renderUser() {
        if (this.props.isLoggedIn) {
            return (
                <li className="nav__item nav__logout">
                    {this.props.name}
                    <br />
                    <Link className="nav__logout-link" to="/logout">Logout</Link>
                </li>
            );
        }

        return null;
    }
}

function mapStateToProps(state) {
    return {
        isLoggedIn: state.auth.isLoggedIn,
        isAdmin: state.auth.user && state.auth.user.isAdmin,
        name: state.auth.user ? state.auth.user.name : null
    }
}

export default connect(mapStateToProps)(Navigation);