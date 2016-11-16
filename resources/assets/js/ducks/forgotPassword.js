import qs from 'qs';

export const AUTH_FORGOTPASSWORD_REQUEST = 'AUTH_FORGOTPASSWORD_REQUEST';
export const AUTH_FORGOTPASSWORD_SUCCESS = 'AUTH_FORGOTPASSWORD_SUCCESS';
export const AUTH_FORGOTPASSWORD_FAILURE = 'AUTH_FORGOTPASSWORD_FAILURE';

const errors = {
    // SIGNTECH_API_1_1_PARAMETER_FAILED
    '-1': 'Unexcepted error. Please try again later.',
    // SIGNTECH_API_1_1_USER_NOT_EXISTS
    '-3': 'User doesn\'t exists with this e-mail address.',
    // SIGNTECH_API_1_1_NEW_PASSWORD_REQUEST_FAILED
    '-4': 'Unexcepted error. Please try again later.'
};

export default function reducer(state = {
    isLoading: false,
    success: false,
    error: false
}, action) {
    switch (action.type) {
        case AUTH_FORGOTPASSWORD_REQUEST:
            return {
                isLoading: true,
                success: false,
                error: false
            };
        case AUTH_FORGOTPASSWORD_SUCCESS:
            const response = action.payload.data;

            if (response !== 1) {
                return {
                    isLoading: false,
                    success: false,
                    error: errors[response]
                }
            }
            else {
                return {
                    isLoading: false,
                    success: true,
                    error: false
                }
            }
        case AUTH_FORGOTPASSWORD_FAILURE:
            return {
                isLoading: false,
                success: false,
                error: errors[-1]
            }
        default:
            return state;
    }
}

/**
 * Request new password action creator
 *
 * @param {String} email address
 */
export function request(email) {
    return {
        types: [AUTH_FORGOTPASSWORD_REQUEST, AUTH_FORGOTPASSWORD_SUCCESS, AUTH_FORGOTPASSWORD_FAILURE],
        payload: {
            request: {
                url: '/forgot-password',
                method: 'post',
                data: { email }
            }
        }
    }
}