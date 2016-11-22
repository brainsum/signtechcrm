import { TOGGLE_SUCCESS } from 'app/ducks/users/active';

export const FETCH = 'users/fetch';
export const FETCH_SUCCESS = 'users/fetchSuccess';
export const FETCH_FAILURE = 'users/fetchFailure';

const ERROR_MESSAGE = 'Could not fetch users. Please try again later.';

export default function (state = {
    isLoading: false,
    users: null,
    error: null,  
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
        case TOGGLE_SUCCESS:
            const id = action.meta.previousAction.payload.request.data.id;
            const index = state.users.findIndex(user => user.id === id);
            let user = state.users[index];
            user = Object.assign({}, user, { isActive: !user.isActive });

            return Object.assign({}, state, {
                users: state.users.slice(0, index).concat([user]).concat(state.users.slice(index + 1))
            });
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