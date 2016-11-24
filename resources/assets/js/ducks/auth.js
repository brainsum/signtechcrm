import qs from 'qs';

export const LOGIN = 'auth/login';
export const LOGIN_SUCCESS = 'auth/loginSuccess';
export const LOGIN_FAILURE = 'auth/loginFailure';
export const READ_API_JWT = 'auth/readApiJwt';
export const LOGOUT = 'auth/logout';

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
        case LOGIN:
            return Object.assign({}, state, {
                loading: true,
                hasError: false
            });
        // Successful login
        case LOGIN_SUCCESS:
            token = action.payload.data.token;
            localStorage.setItem(LOCAL_STORAGE_JWT_KEY, token);

            return Object.assign({}, state, {
                loading: false,
                token,
                error: null
            });
        // There was an error while trying to login
        case LOGIN_FAILURE:
            return Object.assign({}, state, {
                loading: false,
                error: action.error.response.data.message || 'Unexcepted error.'
            });
        case READ_API_JWT:
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
        case LOGOUT:
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
        types: [LOGIN, LOGIN_SUCCESS, LOGIN_FAILURE],
        payload: {
            request: {
                url: '/login',
                method: 'post',
                data: {
                    name: email,
                    password
                }
            }
        }
    }
}

export function readApiJwt() {
    return {
        type: READ_API_JWT
    }
}

export function logout() {
    return {
        type: LOGOUT
    }
}