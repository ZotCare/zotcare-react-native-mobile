import Uris from '@constants/uris';

import request from '../../utils/request';

export const signIn = user => request.post(Uris.signin, user);
