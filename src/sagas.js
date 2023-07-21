import {all} from 'redux-saga/effects';

import authSaga from '@app/services/auth/saga';

export default function* rootSagas() {
  yield all([authSaga()]);
}
