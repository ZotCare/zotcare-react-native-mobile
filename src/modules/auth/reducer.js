import * as Actions from './constants';

const initState = {
  token: undefined,
  code: '',
  login_loading: false,
  login_error: false,
  err_message: '',
};

export default function auth(state = initState, action = {}) {
  switch (action.type) {
    case Actions.LOGIN:
      return {
        ...state,
        login_loading: true,
      };
    case Actions.LOGIN_SUCCESS:
      return {
        ...state,
        login_loading: false,
        login_error: false,
      };
    case Actions.LOGIN_ERROR:
      return {
        ...state,
        login_loading: false,
        login_error: true,
        err_message: action.message,
      };
    case Actions.SET_TOKEN:
      return {...state, token: action.token};
    case Actions.RESET_AUTH:
      console.log('testt');
      return initState;
    case Actions.CLEAR_ERRORS:
      return {
        ...state,
        login_loading: false,
        login_error: false,
        err_message: '',
      };
    default:
      return state;
  }
}
