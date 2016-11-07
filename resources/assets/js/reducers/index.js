import { combineReducers } from 'redux';
import auth from 'app/reducers/auth';
import myforms from 'app/reducers/myforms';

export default combineReducers({
    auth,
    myforms
});