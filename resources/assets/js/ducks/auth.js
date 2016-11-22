import qs from 'qs';

export const AUTH_LOGIN_REQUEST = 'AUTH_LOGIN_REQUEST';
export const AUTH_LOGIN_SUCCESS = 'AUTH_LOGIN_SUCCESS';
export const AUTH_LOGIN_FAILURE = 'AUTH_LOGIN_FAILURE';
export const AUTH_READ_API_JWT = 'AUTH_READ_API_JWT';
export const AUTH_LOGOUT = 'AUTH_LOGOUT';

const UNKNOWN_ERROR = 'Unknown error. Please try again.';
const WRONG_EMAIL_OR_PASSWORD = 'Login failed, you typed in a wrong e-mail or password';

const LOCAL_STORAGE_JWT_KEY = 'api_jwt';

export default function reducer(state = {
    token: null,
    isLoggedIn: false,
    loading: false,
    error: null,
    user: null,
}, action) {
    let token;

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
            token = action.payload.data.token;

            if (token) {
                localStorage.setItem(LOCAL_STORAGE_JWT_KEY, token);

                return Object.assign(newState, {
                    token,
                    error: null
                });
            }
            else if (action.payload.data === 0) {
                return Object.assign(newState, {
                    isLoggedIn: false,
                    error: WRONG_EMAIL_OR_PASSWORD
                });
            }
            else {
                return Object.assign(newState, {
                    isLoggedIn: false,
                    error: UNKNOWN_ERROR
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
            token = localStorage.getItem(LOCAL_STORAGE_JWT_KEY);
            let user = null;

            try {
                // Get user from token
                user = token.split('.')[1];
                // Base64 decode it
                user = atob(user);
                // Parse it as JSON
                user = JSON.parse(user);
                // Normalize user
                user.companyId = parseInt(user.company);
                delete user.company;
                user.isAdmin = !!user.admin;
                delete user.admin;
            } catch(ex) {
                user = null;
            }

            if (token) {
                return Object.assign({
                    token: token,
                    isLoggedIn: !!user,
                    user
                });
            }

            return state;
        case AUTH_LOGOUT:
            localStorage.removeItem(LOCAL_STORAGE_JWT_KEY);
            
            return Object.assign({
                token: null,
                isLoggedIn: false
            });
        default:
            return state;
    }
}

export function login(email, password) {
    return {
        types: [AUTH_LOGIN_REQUEST, AUTH_LOGIN_SUCCESS, AUTH_LOGIN_FAILURE],
        payload: {
            request: {
                url: '/',
                method: 'post',
                data: qs.stringify({
                    'function': 'login',
                    name: email,
                    password
                })
            }
        }
    }
}

export function readApiJwt() {
    return {
        type: AUTH_READ_API_JWT
    }
}

export function logout() {
    return {
        type: AUTH_LOGOUT
    }
}