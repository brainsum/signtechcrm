export const FETCH = 'myaccount/fetch';
export const FETCH_SUCCESS = 'myaccount/fetchSuccess';
export const FETCH_FAILURE = 'myaccount/fetchFailure';
export const SAVE = 'myaccount/save';
export const SAVE_SUCCESS = 'myaccount/saveSuccess';
export const SAVE_FAILURE = 'myaccount/saveFailure';

export default function reducer(state = {
    isFetching: false,
    fetchError: null,
    data: null,
    isSaving: false,
    saveSuccess: null,
    saveMessage: null
}, action) {
    switch (action.type) {
        case FETCH:
            return Object.assign({}, state, { isFetching: true });
        case FETCH_SUCCESS:
            return Object.assign({}, state, {
                isFetching: false,
                fetchError: null,
                data: action.payload.data
            });
        case FETCH_FAILURE:
            return Object.assign({}, state, {
                isFetching: false,
                fetchError: action.error.response.data.error || 'Unexcepted error.',
                data: null
            });
        case SAVE:
            return Object.assign({}, state, { isSaving: true });
        case SAVE_SUCCESS:
            return Object.assign({}, state, {
                isSaving: false,
                saveSuccess: true,
                saveMessage: action.payload.data.message
            });
        case SAVE_FAILURE:
            return Object.assign({}, state, {
                isSaving: false,
                saveSuccess: false,
                saveMessage: action.error.response.data.error || 'Unexcepted error.'
            })
        default:
            return state;
    }
}

export const fetch = () => ({
    types: [ FETCH, FETCH_SUCCESS, FETCH_FAILURE ],
    payload: {
        request: {
            url: '/user'
        }
    }
});

export const save = data => ({
    types: [ SAVE, SAVE_SUCCESS, SAVE_FAILURE ],
    payload: {
        request: {
            url: '/user',
            method: 'put',
            data
        }
    }
});