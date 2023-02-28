import Uris from '../../constants/Uris';
import request from '../../utils/request';

export const signIn = user => request.post(Uris.signin, user);
