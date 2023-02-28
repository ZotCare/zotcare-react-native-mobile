import AsyncStorage from '@react-native-async-storage/async-storage';
import {call, delay, put, select, takeLatest} from 'redux-saga/effects';

import {createImageFormData} from '../../libs/utils';
import * as SagaActions from './constants';
import {getUUID} from './selectors';
import {getProfile, setProfile, uploadPhoto} from './service';

function* setProfileSaga({profile}) {
  try {
    const uuid = yield select(getUUID);
    yield call(setProfile, {...profile, id: uuid});
    if (profile.name) {
      yield call(AsyncStorage.setItem, 'name', profile.name);
    }
    yield put({
      type: SagaActions.SET_PROFILE_SUCCESS,
      payload: profile,
    });
    yield delay(1000);
    yield put({
      type: SagaActions.SET_PROFILE_SUCCESS_FINISH,
    });
  } catch (e) {
    yield put({
      type: SagaActions.SET_PROFILE_SUCCESS_FINISH,
    });
    yield put({
      type: SagaActions.SET_PROFILE_ERROR,
      message: e,
    });
  }
}

function* getProfileSaga() {
  try {
    const uuid = yield select(getUUID);
    const resp = yield call(getProfile, uuid);

    yield put({
      type: SagaActions.GET_PROFILE_SUCCESS,
      payload: {
        ...resp.data.response.user,
        uuid: resp.data.response.user.id,
        avatar: resp.data.response.user.image.small,
        ...resp.data.response.game_profile,
      },
    });
    yield put({
      type: SagaActions.SET_PROFILE_SUCCESS_FINISH,
    });
  } catch (e) {
    yield put({
      type: SagaActions.GET_PROFILE_ERROR,
      message: e,
    });
  }
}

function* setProfilePhotoSaga({photo}) {
  // //console.log("herrrrr", photo)
  try {
    yield put({
      type: SagaActions.SET_PROFILE_SUCCESS,
      payload: {
        avatar: photo.path,
        image: {small: photo.path, large: photo.path},
      },
    });

    const uuid = yield select(getUUID);
    const _body = yield call(createImageFormData, photo, {uuid});
    // //console.log("herer", _body)
    const resp = yield call(uploadPhoto, _body);
    //console.log(resp)
    yield call(AsyncStorage.setItem, 'avatar', photo.path);
    yield delay(1000);
    yield put({
      type: SagaActions.SET_PROFILE_SUCCESS_FINISH,
    });
  } catch (e) {
    yield put({
      type: SagaActions.SET_PROFILE_ERROR,
      message: e,
    });
  }
}

function* getDBProfileSaga({payload}) {
  const {cb} = payload;

  const getStorate = async () =>
    await AsyncStorage.multiGet(['uuid', 'name', 'email', 'avatar', 'token']);
  const data = yield call(getStorate);

  let profile = {};
  profile[data[0][0]] = data[0][1];
  profile[data[1][0]] = data[1][1];
  profile[data[2][0]] = data[2][1];
  profile[data[3][0]] = data[3][1];
  profile[data[4][0]] = data[4][1];

  // cb(profile)
  yield put({
    type: SagaActions.SET_PROFILE_SUCCESS,
    payload: profile,
  });
}

export default function* profileSaga() {
  //console.log("action saga profile")
  yield takeLatest(SagaActions.SET_PROFILE_PHOTO, setProfilePhotoSaga);
  yield takeLatest(SagaActions.SET_PROFILE, setProfileSaga);
  yield takeLatest(SagaActions.GET_PROFILE, getProfileSaga);
  yield takeLatest(SagaActions.GET_DB_PROFILE, getDBProfileSaga);
}
