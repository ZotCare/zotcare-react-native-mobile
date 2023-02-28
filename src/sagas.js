import {all} from 'redux-saga/effects';

import authSaga from './modules/auth/saga';
import profileSaga from './modules/profile/saga';

export default function* rootSagas() {
  yield all([authSaga(), profileSaga()]);
}
