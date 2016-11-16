export const MYCOMPLETEDFORMS_FETCH = 'MYCOMPLETEDFORMS_FETCH';
export const MYCOMPLETEDFORMS_FETCH_SUCCESS = 'MYCOMPLETEDFORMS_FETCH_SUCCESS';
export const MYCOMPLETEDFORMS_FETCH_FAILURE = 'MYCOMPLETEDFORMS_FETCH_FAILURE';

export default function reducer(state = {
    isLoading: false,
    data: null
}, action) {
    switch (action.type) {
        case MYCOMPLETEDFORMS_FETCH:
            return Object.assign({}, state, {
                isLoading: true,
                error: false
            });
        case MYCOMPLETEDFORMS_FETCH_SUCCESS:
            return {
                isLoading: false,
                data: action.payload.data,
                error: false
            };
        case MYCOMPLETEDFORMS_FETCH_FAILURE:
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
        types: [ MYCOMPLETEDFORMS_FETCH, MYCOMPLETEDFORMS_FETCH_SUCCESS, MYCOMPLETEDFORMS_FETCH_FAILURE ],
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