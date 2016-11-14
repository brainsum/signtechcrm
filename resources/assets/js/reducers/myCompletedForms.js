import {
    MYCOMPLETEDFORMS_FETCH,
    MYCOMPLETEDFORMS_FETCH_SUCCESS,
    MYCOMPLETEDFORMS_FETCH_FAILURE
} from 'app/actions/myCompletedForms';

export default function(state = {
    isLoading: false,
    data: null
}, action) {
    switch (action.type) {
        case MYCOMPLETEDFORMS_FETCH:
            return {
                isLoading: true,
                data: null,
                error: false
            };
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