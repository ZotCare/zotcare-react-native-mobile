import request from '../../utils/request';
import Uris from '../../constants/Uris';

export const setProfile = user =>
  request.put(Uris.set_user_profile + '/' + user.id, user);

export const getProfile = uuid =>
  request.get(Uris.get_user_profile + '/' + uuid);

export const uploadPhoto = photo => request.post(Uris.upload_avatar, photo);
