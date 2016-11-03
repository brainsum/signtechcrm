import {
    AUTH_LOGIN_REQUEST,
    AUTH_LOGIN_SUCCESS,
    AUTH_LOGIN_FAILURE
} from 'app/actions/auth';

const UNKNOWN_ERROR = 'Unknown error. Please try again.';
const WRONG_EMAIL_OR_PASSWORD = 'Login failed, you typed in a wrong e-mail or password';

export default function(state = {
    loggedIn: false,
    loading: false,
    error: null
}, action) {
    switch (action.type) {
        case AUTH_LOGIN_REQUEST:
            return Object.assign({}, state, {
                loading: true,
                hasError: false
            });
        case AUTH_LOGIN_SUCCESS:
            let newState = Object.assign({}, state, {
                loading: false
            });

            switch (action.payload.data) {
                case 0:
                    return Object.assign(newState, {
                        loggedIn: false,
                        error: WRONG_EMAIL_OR_PASSWORD
                    });
                case 1:
                    return Object.assign(newState, {
                        loggedIn: false,
                        error: UNKNOWN_ERROR
                    });
                default:
                    return Object.assign(newState, {
                        loggedIn: true,
                        error: null
                    });
            }

            return newState;
        case AUTH_LOGIN_FAILURE:
            return Object.assign({}, state, {
                loading: false,
                error: UNKNOWN_ERROR
            });
        default:
            return state;
    }
}