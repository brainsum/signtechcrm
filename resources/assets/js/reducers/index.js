import { combineReducers } from 'redux';
import auth from 'app/reducers/auth';
import myCompletedForms from 'app/reducers/myCompletedForms';
//import myForms from 'app/reducers/myForms';

export default combineReducers({
    auth,
    myCompletedForms
    //myForms
});