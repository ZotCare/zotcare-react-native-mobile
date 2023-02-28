import * as Actions from './constants';

const initState = {
  error_message: '',
  visible: false,
  check: false,
};

export default function common(state = initState, action = {}) {
  // //console.log("action", action)
  switch (action.type) {
    case Actions.ERROR:
      return {...state, ...action};
    default:
      return state;
  }
}
