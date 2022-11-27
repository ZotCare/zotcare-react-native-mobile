import * as Actions from './constants';

const initState = {
  "email": "",
  "image": { "large": null, "small": null },
  "settings": {},
  "username": "",
  "verified": 1,
  apns_token: "",
  registration_token: "",
  set_profile_loading: false,
  set_profile_error: false,
  set_profile_success: false,
  get_profile_loading: false,
  get_profile_error: false,
  err_message: ""
};

export default function profile(state = initState, action = {}) {
  switch (action.type) {
    case Actions.SET_PROFILE:
      return {
        ...state,
        set_profile_loading: true,
        set_profile_success: false,
        set_profile_error: false
      };
    case Actions.SET_PROFILE_SUCCESS:
      return {
        ...state,
        set_profile_loading: false,
        set_profile_error: false,
        set_profile_success: true,
        ...action.payload
      }
    case Actions.SET_PROFILE_SUCCESS_FINISH:
      return {
        ...state,
        set_profile_success: false,
        ...action.payload
      }
    case Actions.SET_PROFILE_ERROR:
      return {
        ...state,
        set_profile_loading: false,
        set_profile_error: true,
        err_message: action.message
      }    
    case Actions.GET_PROFILE:
      return {
        ...state,
        get_profile_loading: true
      }
    case Actions.GET_PROFILE_SUCCESS:
      return {
        ...state,
        get_profile_loading: false,
        get_profile_error: false,
        ...action.payload
      }
    case Actions.GET_PROFILE_ERROR:
      return {
        ...state,
        get_profile_loading: false,
        get_profile_error: false,
        err_message: action.message
      }
    case Actions.SET_APNS_TOKEN:
      return {
        ...state,
        apns_token: action.token
      }
    case Actions.SET_RREGISTRATION_TOKEN:
      return {
        ...state,
        registration_token: action.token
      }
    case Actions.RESET_PROFILE:
      return initState;   
    case Actions.CLEAR_ERRORS:
      return {
        ...state,
        set_profile_loading: false,
        set_profile_error: false,
        set_profile_success: false,
        get_profile_loading: false,
        get_profile_error: false,
        err_message: ""
      }
    default:
      return state
  }
}

