import {
    MYFORMS_FETCH,
    MYFORMS_FETCH_SUCESS,
    MYFORMS_FETCH_FAILURE,
    MYFORMS_FILTER
} from 'app/actions/myforms';
import { AUTH_LOGOUT } from 'app/actions/auth';

const getInitialState = () => {
    return {
        isLoading: false,
        forms: [],
        keyword: null,
        filteredForms: [],
        error: false
    }
};

export default function(state = null, action) {
    if (!state) {
        state = getInitialState();
    }

    switch (action.type) {
        case MYFORMS_FETCH:
            return {
                isLoading: true,
                forms: [],
                keyword: null,
                filteredForms: [],
                error: false
            }
        case MYFORMS_FETCH_SUCESS:
            const forms = action.payload.data;

            return {
                isLoading: false,
                forms,
                keyword: null,
                filteredForms: forms,
                error: false
            }
        case MYFORMS_FETCH_FAILURE:
            return {
                isLoading: false,
                forms: [],
                keyword: null,
                filteredForms: [],
                error: true
            }
        case MYFORMS_FILTER:
            if (action.payload.keyword) {
                const keyword = action.payload.keyword.toLowerCase();

                return Object.assign({}, state, {
                    keyword,
                    filteredForms: state.forms.filter(form => {
                        return form.form_title.toLowerCase().indexOf(keyword) !== -1;
                    })
                })
            }
            else {
                return Object.assign({}, state, {
                    keyword: null,
                    filteredForms: state.forms
                });
            }
        case AUTH_LOGOUT:
            return getInitialState();
        default:
            return state;
    }
}