import qs from 'qs';

export const MYFORMS_FETCH = 'MYFORMS_FETCH';
export const MYFORMS_FETCH_SUCESS = 'MYFORMS_FETCH_SUCESS';
export const MYFORMS_FETCH_FAILURE = 'MYFORMS_FETCH_FAILURE';
export const MYFORMS_FILTER = 'MYFORMS_FILTER';

export function fetch(companyId) {
    return {
        types: [MYFORMS_FETCH, MYFORMS_FETCH_SUCESS, MYFORMS_FETCH_FAILURE],
        payload: {
            request: {
                url: '/',
                method: 'post',
                data: qs.stringify({
                    'function': 'form_list',
                    company_id: companyId
                })
            }
        }
    }
}

export function filter(keyword) {
    return {
        type: MYFORMS_FILTER,
        payload: {
            keyword
        }
    }
}