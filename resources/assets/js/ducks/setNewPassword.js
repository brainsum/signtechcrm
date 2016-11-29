export const SETNEWPASSWORD_REQUEST = 'SETNEWPASSWORD_REQUEST';
export const SETNEWPASSWORD_SUCCESS = 'SETNEWPASSWORD_SUCCESS';
export const SETNEWPASSWORD_FAILURE = 'SETNEWPASSWORD_FAILURE';

const errors = {
    // SIGNTECH_API_1_1_PARAMETER_FAILED
    '-1': 'Unexcepted error. Please try again later.',
    // SIGNTECH_API_1_1_USER_NOT_EXISTS
    '-3': 'You have already set a new password with this link.',
    // SIGNTECH_API_1_1_ONE_TIME_LINK_EXPIRED
    '-5': 'The password request link expired. Please request a new password request.',
    // SIGNTECH_API_1_1_USER_PASSWORD_MODIFY_FAILED
    '-6': 'Unexcepted error. Please try again later.'
};

export default function reducer(state = {
    isLoading: false,
    success: false,
    error: false
}, action) {
    switch (action.type) {
        case SETNEWPASSWORD_REQUEST:
            return {
                isLoading: true,
                success: false,
                error: false
            };
        case SETNEWPASSWORD_SUCCESS:
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
        case SETNEWPASSWORD_FAILURE:
            return {
                isLoading: false,
                success: false,
                error: errors[-1]
            }
        default:
            return state;
    }
}

export function set({
    userId,
    timestamp,
    hashedPassword,
    password
}) {
    return {
        types: [SETNEWPASSWORD_REQUEST, SETNEWPASSWORD_SUCCESS, SETNEWPASSWORD_FAILURE],
        payload: {
            request: {
                url: '/set-new-password',
                method: 'post',
                data: {
                    userId,
                    timestamp,
                    hashedPassword,
                    password
                }
            }
        }
    }
}