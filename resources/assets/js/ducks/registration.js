export const REQUEST = 'registration/request';
export const REQUEST_SUCCESS = 'registration/requestSuccess';
export const REQUEST_FAILURE = 'registration/requestFailure';
export const CLEAR = 'registration/clear';

const initialState = () => ({
    isLoading: false,
    success: null,
    message: null
});

export default function reducer(state = undefined, action) {
    if (state === undefined) {
        state = initialState();
    }

    switch (action.type) {
        case REQUEST:
            return Object.assign({}, initialState(), { isLoading: true });
        case REQUEST_SUCCESS:
            const response = action.payload.data;

            return Object.assign({}, response, {
                isLoading: false
            });
        case REQUEST_FAILURE:
            return {
                isLoading: false,
                success: false,
                message: 'Unexcepted error. Please try again later.'
            };
        case CLEAR:
            return initialState();
        default:
            return state;
    }
}

export function registrate(user) {
    return {
        types: [ REQUEST, REQUEST_SUCCESS, REQUEST_FAILURE ],
        payload: {
            request: {
                url: 'registration',
                method: 'post',
                data: user
            }
        }
    }
}

export function clear() {
    return {
        type: CLEAR
    }
}