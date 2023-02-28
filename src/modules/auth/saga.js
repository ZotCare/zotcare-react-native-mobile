import AsyncStorage from '@react-native-async-storage/async-storage';
import {call, put, select, takeLatest} from 'redux-saga/effects';

import globalConfig from '../../utils/global';
import * as AuthActions from '../auth/constants';
import * as ProfileActions from '../profile/constants';
import * as SagaActions from './constants';
import {signIn} from './service';

function* storeProfile(user) {
  yield call(AsyncStorage.setItem, 'username', user.username);
  yield call(AsyncStorage.setItem, 'roles', JSON.stringify(user.roles));
  yield call(AsyncStorage.setItem, 'uuid', user.id);
  const token = yield select(globalConfig.getToken);

  yield call(AsyncStorage.setItem, 'token', token);
  yield put({
    type: SagaActions.SET_TOKEN,
    token: token,
  });
}

function* signInSaga({user}) {
  try {
    const resp = yield call(signIn, user);
    if (resp.status !== 200) {
      throw resp.data.error.message;
    }

    yield put({
      type: SagaActions.LOGIN_SUCCESS,
    });

    yield call(globalConfig.setToken, resp.data.authentication_token);
    yield put({
      type: ProfileActions.SET_PROFILE_SUCCESS,
      payload: {id: resp.data.id, username: user.username},
    });
    yield call(storeProfile, {...resp.data, username: user.username});
  } catch (e) {
    yield put({type: SagaActions.LOGIN_ERROR, message: e});
    yield put({type: ProfileActions.RESET_PROFILE});
  }
}

function* signOutSaga() {
  try {
    yield call(AsyncStorage.removeItem, 'token');
    yield call(globalConfig.setToken, null);
    yield call(AsyncStorage.removeItem, 'uuid');
    yield call(AsyncStorage.removeItem, 'roles');
    yield call(AsyncStorage.removeItem, 'username');

    yield put({type: AuthActions.RESET_AUTH});
    yield put({type: ProfileActions.RESET_PROFILE});

    // yield call(SplashScreen.show);
  } catch (e) {
    //console.log(e);
    // yield call(handleError, e);
  }
}

function* getDBTokenSaga() {
  const token = yield call(AsyncStorage.getItem, 'token');
  //console.log(token)
  if (token !== null) {
    yield put({
      type: SagaActions.SET_TOKEN,
      token,
    });
    yield call(globalConfig.setToken, token);
  }
}

function* loadFromDB({cb}) {
  yield call(cb);
}

export default function* authSaga() {
  yield takeLatest(SagaActions.LOGIN, signInSaga);
  yield takeLatest(SagaActions.SIGN_OUT, signOutSaga);
  yield takeLatest(SagaActions.GET_DB_TOKEN, getDBTokenSaga);
  yield takeLatest(SagaActions.GET_DB_DATA, loadFromDB);
}
