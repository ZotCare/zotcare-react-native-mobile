import request from '../../utils/request';
import Uris from '../../constants/Uris'

export const signIn = (user) =>
  request.post(Uris.signin, user);
