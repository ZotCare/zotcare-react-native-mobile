import { combineReducers } from 'redux';
import profileReducer from './modules/profile/reducer'
import authReducer from './modules/auth/reducer'

/**
 * Root reducer
 * @type {Reducer<any> | Reducer<any, AnyAction>}
 */
const rootReducers = combineReducers({
  auth: authReducer,
  profile: profileReducer,
});

export default rootReducers;
