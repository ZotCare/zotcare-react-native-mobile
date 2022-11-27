import * as Actions from './constants';

export function signIn(user) {
  return {
    type: Actions.LOGIN,
    user
  }
}

export function signOut() {
  return {
    type: Actions.SIGN_OUT
  }
}

export function getDBToken() {
  return {
    type: Actions.GET_DB_TOKEN
  }
}