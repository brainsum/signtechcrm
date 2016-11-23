import React from 'react';
import UserDetailsPage from 'app/components/pages/UserDetailsPage';
import auth from 'app/components/utils/auth';
import { connect } from 'react-redux';
import { fetch, save } from 'app/ducks/user';

class MyAccountPage extends UserDetailsPage {
    constructor(props) {
        super(props);

        this.state = {
            showValidationErrors: false
        };
        props.fetch();

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e) {
        e.preventDefault();

        this.handleChange(null, () => {
            const data = {};
            let hasError = false;
            ['firstName', 'lastName', 'email', 'phone', 'password', 'passwordRepeat'].forEach(fieldName => {
                const fieldState = this.state[fieldName];

                if (!fieldState.isValid){
                   hasError = true;
                   return;
                }

                data[fieldName] = fieldState.value;
            });

            if (hasError) {
                this.setState({
                    showValidationErrors: true
                });
            }
            else {
                this.props.save(data);
            }
        });
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.data !== nextProps.data) {
            const toState = {};

            Object.keys(nextProps.data).forEach(fieldName => {
                toState[fieldName] = {
                    value: nextProps.data[fieldName],
                    isValid: true
                }
            });

            this.setState(toState);
        }
    }

    render() {
        const { data, error } = this.props;

        return (
            <form className="container" onSubmit={this.handleSubmit}>
                <h1 className="page-title">My account</h1>

                <div className="row">
                    <div className="col-md-6 offset-md-3 col-lg-4 offset-lg-4">
                        {this.renderContent()}
                    </div>
                </div>
            </form>
        );
    }

    renderContent() {
        // Fetching user data
        if (this.props.isFetching) {
            return <div className="text-xs-center">Loading...</div>;
        }
        // Error while fetching user data
        else if (this.props.fetchError) {
            return <div className="alert alert-danger">{this.props.fetchError}</div>;
        }
        // Show the form
        else {
            return this.renderForm();
        }
    }

    renderForm() {
        return (
            <div>
                {this.renderInputs(true, 'Change password')}

                <button className="btn btn-primary btn-block" disabled={this.props.isSaving}>
                    {this.props.isSaving ? 'Saving...' : 'Save'}
                </button>

                {this.renderResult()}
            </div>
        );
    }
}

const mapStateToProps = state => {
    const { isFetching, fetchError, data, isSaving, saveSuccess, saveMessage } = state.user;
    return { isFetching, fetchError, data, isSaving, success: saveSuccess, message: saveMessage };
};

MyAccountPage = connect(mapStateToProps, { fetch, save })(MyAccountPage);
MyAccountPage = auth(MyAccountPage);
export default MyAccountPage;