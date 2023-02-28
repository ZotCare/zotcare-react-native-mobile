import {combineReducers} from 'redux';

import authReducer from './modules/auth/reducer';
import profileReducer from './modules/profile/reducer';

/**
 * Root reducer
 * @type {Reducer<any> | Reducer<any, AnyAction>}
 */
const rootReducers = combineReducers({
  auth: authReducer,
  profile: profileReducer,
});

export default rootReducers;
