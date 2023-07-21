import Uris from '@app/constants/Uris';
import request from '@app/utils/request';

export const fetchGroupProfile = async (): Promise<any> => {
  const response = await request.get(`${Uris.group_profile}`);
  return response.data;
};
