import { combineReducers } from 'redux';
import LoginReducer from './LoginReducer';
import selectidreducer from './selectidreducer';
import SearchReducer from './SearchReducer';

export default combineReducers({
    login: LoginReducer,
    selectId: selectidreducer,
    search : SearchReducer,
});