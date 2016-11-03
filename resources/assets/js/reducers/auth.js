import {
    AUTH_LOGIN_REQUEST,
    AUTH_LOGIN_SUCCESS,
    AUTH_LOGIN_FAILURE,
    AUTH_READ_API_JWT,
    AUTH_LOGOUT
} from 'app/actions/auth';

const UNKNOWN_ERROR = 'Unknown error. Please try again.';
const WRONG_EMAIL_OR_PASSWORD = 'Login failed, you typed in a wrong e-mail or password';

const LOCAL_STORAGE_JWT_KEY = 'api_jwt';

export default function(state = {
    loggedIn: false,
    loading: false,
    error: null
}, action) {
    switch (action.type) {
        // Login request started
        case AUTH_LOGIN_REQUEST:
            return Object.assign({}, state, {
                loading: true,
                hasError: false
            });
        // Login request finished successfully (not necessary a successful login)
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
                    console.log(action.payload.data.token);
                    localStorage.setItem(LOCAL_STORAGE_JWT_KEY, action.payload.data.token);

                    return Object.assign(newState, {
                        error: null
                    });
            }

            return newState;
        // There was an error while trying to login
        case AUTH_LOGIN_FAILURE:
            return Object.assign({}, state, {
                loading: false,
                error: UNKNOWN_ERROR
            });
        case AUTH_READ_API_JWT:
            const token = localStorage.getItem(LOCAL_STORAGE_JWT_KEY);

            if (token) {
                return Object.assign({
                    loggedIn: true
                });
            }

            return state;
        case AUTH_LOGOUT:
            localStorage.removeItem(LOCAL_STORAGE_JWT_KEY);
            
            return Object.assign({
                loggedIn: false
            });
        default:
            return state;
    }
}