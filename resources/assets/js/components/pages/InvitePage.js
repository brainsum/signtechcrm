import React, { Component } from 'react';
import AuthRedirect from 'app/components/utils/AuthRedirect';
import { invite, clear } from 'app/ducks/invite';
import { connect } from 'react-redux';
import cloneDeep from 'lodash/cloneDeep';

class InvitePage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            users: [ this.getNewUser() ]
        }

        this.handleAddNewUser = this.handleAddNewUser.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    getNewUser() {
        return {
            email: '',
            lastName: '',
            firstName: '',
            phone: ''
        }
    }

    handleRemove(index) {
        const user = this.state.users[index];
        const isFilled = user.email || user.lastName || user.firstName || user.phone;

        if(!isFilled || confirm('Are you sure you want to delete the user?')) {
            const users = this.state.users;

            this.setState({
                users: users.slice(0, index).concat(users.slice(index + 1))
            });
        }
    }

    handleAddNewUser() {
        this.props.dispatch(clear());

        this.setState({
            users: this.state.users.concat([ this.getNewUser() ])
        });
    }

    handleChange(e, index, field) {
        const user = Object.assign({}, this.state.users[index], {
            [field]: e.target.value
        });

        const users = cloneDeep(this.state.users);
        users[index] = user;

        this.setState({ users });
    }

     handleSubmit(e) {
        e.preventDefault();

        this.props.dispatch(invite(this.state.users));
    }

    render() {
        return (
            <div className="container">
                <AuthRedirect login={true} admin={true} />
                <h1 className="page-title">Invite users</h1>

                <form onSubmit={this.handleSubmit}>
                    {this.renderTable()}
                </form>
            </div>
        );
    }

    renderTable() {
        return (
            <table className="table">
                <thead>
                    <tr>
                        <th width="1%">#</th>
                        <th>E-mail*</th>
                        <th>Last name*</th>
                        <th>First name*</th>
                        <th>Phone</th>
                        <th width="1%"></th>
                    </tr>
                </thead>
                {this.state.users.map((index, user) => this.renderRow(index, user))}
                <tfoot>
                    <tr>
                        <td className="text-xs-center" colSpan="6">
                            <button
                                className="btn btn-secondary"
                                type="button"
                                onClick={this.handleAddNewUser}
                            >
                                Add new user
                            </button>
                            {' '}
                            <button
                                className="btn btn-primary"
                                disabled={this.props.isLoading}
                            >
                                {this.props.isLoading ? 'Sending invites...' : 'Send invites'}
                            </button>
                        </td>
                    </tr>
                </tfoot>
            </table>
        );
    }

    renderRow(user, index) {
        let className = '';
        let message = null;

        if (this.props.results) {
            const result = this.props.results[index];
            className = result.success ? 'success' : 'danger';
            message = result.message;
        }

        return (
            <tbody key={index}>
                <tr className={className ? `bg-${className} text-white` : ''}>
                    <td>{index + 1}.</td>
                    <td>
                        <input
                            className="form-control"
                            type="email"
                            value={user.email}
                            onChange={e => this.handleChange(e, index, 'email')}
                            required
                        />
                        { message ? <div className={`mt-1`}><strong>{message}</strong></div> : null}
                    </td>
                    <td>
                        <input
                            className="form-control"
                            type="text"
                            value={user.lastName}
                            onChange={e => this.handleChange(e, index, 'lastName')}
                            required
                        />
                    </td>
                    <td>
                        <input
                            className="form-control"
                            type="text"
                            value={user.firstName}
                            onChange={e => this.handleChange(e, index, 'firstName')}
                            required
                        />
                    </td>
                    <td>
                        <input
                            className="form-control"
                            type="phone"
                            value={user.phone}
                            onChange={e => this.handleChange(e, index, 'phone')}
                        />
                    </td>
                    <td>
                        <button
                            className="btn btn-danger"
                            onClick={() => this.handleRemove(index)}
                        >
                            Remove
                        </button>
                    </td>
                </tr>
            </tbody>
        );
    }
}

function mapStateToProps(state) {
    const { isLoading, results, error } = state.invite;
    return { isLoading, results, error };
}

export default connect(mapStateToProps)(InvitePage);