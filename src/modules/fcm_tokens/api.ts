import Uris from '../../constants/Uris';
import request from '../../utils/request';

export const postFcmTokens = async (
  fcmToken: string,
  timezoneOffset: number,
  deviceId: string,
): Promise<string[]> => {
  const response = await request.post(Uris.phones, {
    token: fcmToken,
    timezoneOffset,
    deviceId,
  });
  return response.data;
};

export const deleteFcmToken = async (device_id: string): Promise<void> => {
  await request.delete(`${Uris.phones}/${device_id}`);
};
