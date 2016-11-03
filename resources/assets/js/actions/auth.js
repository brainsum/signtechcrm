import qs from 'qs';

export const AUTH_LOGIN_REQUEST = 'AUTH_LOGIN_REQUEST';
export const AUTH_LOGIN_SUCCESS = 'AUTH_LOGIN_SUCCESS';
export const AUTH_LOGIN_FAILURE = 'AUTH_LOGIN_FAILURE';

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