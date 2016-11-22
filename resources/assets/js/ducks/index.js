import { combineReducers } from 'redux';
import auth from 'app/ducks/auth';
import completedForms from 'app/ducks/completedForms';
import forgotPassword from 'app/ducks/forgotPassword';
import setNewPassword from 'app/ducks/setNewPassword';
import invite from 'app/ducks/invite';
import registration from 'app/ducks/registration';

export default combineReducers({
    auth,
    completedForms,
    forgotPassword,
    setNewPassword,
    invite,
    registration
});