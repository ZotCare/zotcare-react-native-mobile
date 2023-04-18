import Uris from '@app/constants/Uris';
import request from '@app/utils/request';

export const fetchProfile = async (): Promise<any> => {
  const response = await request.get(`${Uris.profile}/my`);
  return response.data;
};

export const modifyProfile = async (new_profile: any): Promise<any> => {
  const response = await request.patch(`${Uris.profile}/my`, new_profile);
  return response.data;
};

export const fetchProfileKeys = async (): Promise<any> => {
  const response = await request.get(Uris.profile_keys);
  return response.data;
};
