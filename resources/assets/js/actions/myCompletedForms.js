export const MYCOMPLETEDFORMS_FETCH = 'MYCOMPLETEDFORMS_FETCH';
export const MYCOMPLETEDFORMS_FETCH_SUCCESS = 'MYCOMPLETEDFORMS_FETCH_SUCCESS';
export const MYCOMPLETEDFORMS_FETCH_FAILURE = 'MYCOMPLETEDFORMS_FETCH_FAILURE';

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