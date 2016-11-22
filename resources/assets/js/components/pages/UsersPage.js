import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetch, toggleIsActive } from 'app/ducks/users';
import auth from 'app/components/utils/auth';

class UsersPage extends Component {
    constructor(props) {
        super(props);
        props.fetch();
    }

    handleToggleActive(id) {
        const user = this.props.users.find(user => user.id === id);
        this.props.toggleIsActive(id, !user.isActive);
    }

    render() {
        return (
            <div className="container">
                <h1 className="page-title">Manage company users</h1>

                <table className="table table-striped table-hover">
                    <thead>
                        <tr>
                            <th>First name</th>
                            <th>Last name</th>
                            <th>E-mail</th>
                            <th>Phone</th>
                            <th className="text-xs-center" width="1%">Activated</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.renderRows()}
                    </tbody>
                </table>
            </div>
        );
    }

    renderRows() {
        if (this.props.isLoading) {
            return (
                <tr>
                    <td className="text-xs-center" colSpan="5">Loading...</td>
                </tr>
            );
        }
        else if (this.props.error) {
            return (
                <tr>
                    <td className="text-xs-center" colSpan="5">{this.props.error}</td>
                </tr>
            );
        }
        else if (this.props.users) {
            return this.props.users.map(user => this.renderRow(user));
        }

        return null;
    }

    renderRow(user) {
        return (
            <tr key={user.id}>
                <td>{user.firstName}</td>
                <td>{user.lastName}</td>
                <td>
                    <a href={`mailto:${user.email}`}>{user.email}</a>
                </td>
                <td>{user.phone}</td>
                <td className="text-xs-center">
                    <button
                        className={`btn btn-${user.isActive ? 'success' : 'danger'}`}
                        onClick={() => this.handleToggleActive(user.id)}
                        type="button"
                    >
                        {user.isActive ? 'Deactivate' : 'Activate'}
                    </button>
                </td>
            </tr>
        );
    }
}

function mapStateToProps(state) {
    const { isLoading, users, error } = state.users;
    return { isLoading, users, error };
}

UsersPage = connect(mapStateToProps, { fetch, toggleIsActive })(UsersPage);
UsersPage = auth(UsersPage, { admin: true });
export default UsersPage;