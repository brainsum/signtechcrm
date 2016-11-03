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

function mapStateToProps(state) {
    return {
        loggedIn: state.auth.loggedIn
    }
}

export default connect(mapStateToProps)(Navigation);