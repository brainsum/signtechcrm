export const COMPLETEDFORMS_FETCH = 'COMPLETEDFORMS_FETCH';
export const COMPLETEDFORMS_FETCH_SUCCESS = 'COMPLETEDFORMS_FETCH_SUCCESS';
export const COMPLETEDFORMS_FETCH_FAILURE = 'COMPLETEDFORMS_FETCH_FAILURE';

export default function reducer(state = {
    isLoading: false,
    data: null
}, action) {
    switch (action.type) {
        case COMPLETEDFORMS_FETCH:
            return Object.assign({}, state, {
                isLoading: true,
                error: false
            });
        case COMPLETEDFORMS_FETCH_SUCCESS:
            return {
                isLoading: false,
                data: action.payload.data,
                error: false
            };
        case COMPLETEDFORMS_FETCH_FAILURE:
            return {
                isLoading: false,
                data: null,
                error: true
            };
        default:
            return state;
    }
}

export function fetch({
    page,
    filters
}) {
    return {
        types: [ COMPLETEDFORMS_FETCH, COMPLETEDFORMS_FETCH_SUCCESS, COMPLETEDFORMS_FETCH_FAILURE ],
        payload: {
            request: {
                url: '/completed-forms',
                method: 'get',
                params: {
                    page,
                    filters
                }
            }
        }
    }
}