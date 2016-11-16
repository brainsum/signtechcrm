import { combineReducers } from 'redux';
import auth from 'app/ducks/auth';
import myCompletedForms from 'app/ducks/myCompletedForms';
import forgotPassword from 'app/ducks/forgotPassword';
import setNewPassword from 'app/ducks/setNewPassword';
import invite from 'app/ducks/invite';

export default combineReducers({
    auth,
    myCompletedForms,
    forgotPassword,
    setNewPassword,
    invite
});