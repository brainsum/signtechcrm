import React from 'react';
import UserDetailsPage from 'app/components/pages/UserDetailsPage';
import { connect } from 'react-redux';
import { registrate, clear } from 'app/ducks/registration';
import auth from 'app/components/utils/auth';

class RegistrationPage extends UserDetailsPage {
    constructor(props) {
        super(props);

        this.state = {
            showValidationErrors: false
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.passwordRequired = true;
    }

    handleSubmit(e) {
        e.preventDefault();

        this.handleChange(null, () => {
            const data = {};
            let hasError = false;
            ['firstName', 'lastName', 'email', 'password', 'passwordRepeat'].forEach(fieldName => {
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
                this.props.registrate(data);
            }
        });
    }

    componentWillUnmount() {
        this.props.clear();
    }

    render() {
        return (
            <form className="container" onSubmit={this.handleSubmit}>
                <h1 className="page-title">Registration</h1>

                <div className="row">
                    <div className="col-md-6 offset-md-3 col-lg-4 offset-lg-4">
                        {this.renderInputs()}

                        <button className="btn btn-primary btn-block">
                            {this.props.isLoading ? 'Loading...' : 'Registrate'}
                        </button>

                        {this.renderResult()}
                    </div>
                </div>
            </form>
        );
    }
}

function mapStateToProps(state) {
    const { isLoading, success, message } = state.registration;
    return { isLoading, success, message };
}

RegistrationPage = connect(mapStateToProps, { registrate, clear })(RegistrationPage);
RegistrationPage = auth(RegistrationPage, { login: false});
export default RegistrationPage;