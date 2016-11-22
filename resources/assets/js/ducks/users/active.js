export const TOGGLE = 'users/active/toggle';
export const TOGGLE_SUCCESS = 'users/toggleSuccess';
export const TOGGLE_FAILURE = 'users/toggleFailure';

export default function(state = {}, action) {
    let id;

    switch (action.type) {
        case TOGGLE:
            id = action.payload.request.data.id;

            return Object.assign({}, state, {
                [id]: { isLoading: true }
            });
        case TOGGLE_SUCCESS:
            id = action.meta.previousAction.payload.request.data.id;
            
            return Object.assign({}, state, {
                [id]: { isLoading: false }
            });
        case TOGGLE_FAILURE:
            id = action.meta.previousAction.payload.request.data.id;
            
            return Object.assign({}, state, {
                [id]: { isLoading: false }
            });
        default:
            return state;
    }
}

export const toggleIsActive = (id, isActive) => ({
    types: [ TOGGLE, TOGGLE_SUCCESS, TOGGLE_FAILURE ],
    payload: {
        request: {
            url: '/users/toggleIsActive',
            method: 'put',
            data: {
                id,
                isActive
            }
        }
    }
});