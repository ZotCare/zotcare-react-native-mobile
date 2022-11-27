import * as Actions from './constants';

export function getDBProfile(cb = () => { }) {
  return {
    type: Actions.GET_DB_PROFILE,
    payload: { cb }
  }
}

export function getProfile() {
  return {
    type: Actions.GET_PROFILE
  }
}

export function setProfilePhoto(photo) {
  return {
    type: Actions.SET_PROFILE_PHOTO,
    photo
  }
}

export function setProfile(profile) {
  return {
    type: Actions.SET_PROFILE,
    profile
  }
}

export function setApnsToken(token) {
  return {
    type: Actions.SET_APNS_TOKEN,
    token
  }
}

export function setRegistrationToken(token) {
  return {
    type: Actions.SET_RREGISTRATION_TOKEN,
    token
  }
}

