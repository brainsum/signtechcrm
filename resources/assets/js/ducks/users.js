import { combineReducers } from 'redux';
import list, { fetch } from 'app/ducks/users/list';
import active, { toggleIsActive } from 'app/ducks/users/active';

export default combineReducers({
    list,
    active
});
export { fetch, toggleIsActive };
