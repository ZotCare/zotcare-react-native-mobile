import messaging, {
  FirebaseMessagingTypes,
} from '@react-native-firebase/messaging';
import {getUniqueId} from 'react-native-device-info';
import {Notifier} from 'react-native-notifier';

import {postFcmTokens} from '../modules/fcm_tokens/api';
import {NavigationService} from '../navigation';

export const handlePress = (data?: {[key: string]: string}) => {
  switch (data?.action) {
    case 'navigate':
      NavigationService.navigate(data?.screen, {id: data?.id});
  }
};

export const handleForegroundNotification = async (
  remoteMessage: FirebaseMessagingTypes.RemoteMessage,
) => {
  if (remoteMessage.notification) {
    Notifier.showNotification({
      title: remoteMessage.notification?.title,
      description: remoteMessage.notification?.body,
      duration: +(remoteMessage.data?.duration || 0),
      swipeEnabled: true,
      onPress: () => {
        handlePress(remoteMessage.data);
      },
    });
  } else if (remoteMessage.data?.type === 'communication') {
  }
};

export const sendToken = async () => {
  await messaging().registerDeviceForRemoteMessages();
  const fcmToken = await messaging().getToken();
  const deviceId = await getUniqueId();
  const timezoneOffset = new Date().getTimezoneOffset();
  return await postFcmTokens(fcmToken, timezoneOffset, deviceId);
};
