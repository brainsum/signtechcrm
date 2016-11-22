import qs from 'qs';

export const FETCH = 'users/fetch';
export const FETCH_SUCCESS = 'users/fetchSuccess';
export const FETCH_FAILURE = 'users/fetchFailure';
export const TOGGLE_IS_ACTIVE = 'users/toggleIsActive';
export const TOGGLE_IS_ACTIVE_SUCCESS = 'users/toggleIsActiveSuccess';
export const TOGGLE_IS_ACTIVE_FAILURE = 'users/toggleIsActiveFailure';

const ERROR_MESSAGE = 'Could not fetch users. Please try again later.';

export default function reducer(state = {
    isLoading: false,
    users: null,
    error: null
}, action) {
    switch (action.type) {
        case FETCH:
            return Object.assign({}, state, { isLoading: true });
        case FETCH_SUCCESS:
            return {
                isLoading: false,
                users: action.payload.data,
                error: null
            };
        case FETCH_FAILURE:
            return {
                isLoading: false,
                users: null,
                error: action.error.response.data.error || ERROR_MESSAGE
            };
        default:
            return state;
    }
}

export const fetch = () => ({
    types: [ FETCH, FETCH_SUCCESS, FETCH_FAILURE ],
    payload: {
        request: {
            url: '/users',
            method: 'get'
        }
    }
});

export const toggleIsActive = () => ({
    types: [ TOGGLE_IS_ACTIVE, TOGGLE_IS_ACTIVE_SUCCESS, TOGGLE_IS_ACTIVE_FAILURE ],
    payload: {
        request: {
            url: '/users/toggleIsActive',
            method: 'put'
        }
    }
});