import { combineReducers } from 'redux';
import auth from 'app/reducers/auth';
import myCompletedForms from 'app/reducers/myCompletedForms';
import forgotPassword from 'app/ducks/forgotPassword';
//import myForms from 'app/reducers/myForms';

export default combineReducers({
    auth,
    myCompletedForms,
    forgotPassword
    //myForms
});