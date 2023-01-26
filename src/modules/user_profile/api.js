import request from '../../utils/request';
import Uris from '../../constants/Uris';
import type {Interaction} from '../../models/interaction';

export const fetchProfile = async (): Promise => {
  const response = await request.get(`${Uris.profile}/my`);
  return response.data;
};

export const modifyProfile = async (new_profile): Promise => {
  const response = await request.patch(`${Uris.profile}/my`, new_profile);
  return response.data;
};

export const fetchProfileKeys = async (): Promise => {
  const response = await request.get(Uris.profile_keys);
  return response.data;
};
