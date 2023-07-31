import request from '@app/utils/request';
import Uris from '@constants/uris';

export const fetchGroupProfile = async (): Promise<any> => {
  const response = await request.get(`${Uris.group_profile}`);
  return response.data;
};
