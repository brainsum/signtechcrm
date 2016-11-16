export const INVITE_REQUEST = 'INVITE_REQUEST';
export const INVITE_SUCCESS = 'INVITE_SUCCESS';
export const INVITE_FAILURE = 'INVITE_FAILURE';
export const INVITE_CLEAR = 'INVITE_CLEAR';

const errors = {
    '0': 'Undefined error.',
    '-1': 'Parameter failed.',
    '-2': 'User already exists.'
};

export default function reducer(state = {
    isLoading: false,
    results: null,
    error: false
}, action) {
    switch (action.type) {
        case INVITE_REQUEST:
            return {
                isLoading: true,
                results: null,
                error: false
            }
        case INVITE_SUCCESS:
            const results = action.payload.data.map(result => {
                if (result === 1) {
                    return {
                        success: true,
                        message: 'Invitation sent successfully.'
                    }
                }
                else {
                    return {
                        success: false,
                        message: errors[result]
                    }
                }
            });

            return {
                isLoading: false,
                results,
                error: false
            }
        case INVITE_FAILURE:
            return {
                isLoading: false,
                error: true
            }
        case INVITE_CLEAR:
            return {
                isLoading: false,
                results: null,
                error: false
            }
        default:
            return state;
    }
}

export function invite(users) {
    return {
        types: [ INVITE_REQUEST, INVITE_SUCCESS, INVITE_FAILURE ],
        payload: {
            request: {
                url: '/invite',
                method: 'post',
                data: { users }
            }
        }
    }
}

export function clear() {
    return {
        type: INVITE_CLEAR
    }
}