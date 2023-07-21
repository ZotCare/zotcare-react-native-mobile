import messaging, {
  FirebaseMessagingTypes,
} from '@react-native-firebase/messaging';
import {PermissionsAndroid, Platform} from 'react-native';
import {getUniqueId} from 'react-native-device-info';
import {Notifier} from 'react-native-notifier';

import {navigate} from '@app/navigation/services';
import {postFcmTokens} from '@app/services/fcm_tokens/api';

export const handlePress = (data?: {[key: string]: string}) => {
  switch (data?.action) {
    case 'navigate':
      navigate(data?.screen, {id: data?.id});
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
  if (Platform.OS === 'android') {
    await messaging().registerDeviceForRemoteMessages();
  }
  const fcmToken = await messaging().getToken();
  const deviceId = await getUniqueId();
  const timezoneOffset = new Date().getTimezoneOffset();
  return await postFcmTokens(fcmToken, timezoneOffset, deviceId);
};

export const requestPermission = () => {
  if (Platform.OS === 'android') {
    PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
    );
  } else if (Platform.OS === 'ios') {
    async function requestUserPermission() {
      const authStatus = await messaging().requestPermission();
      const enabled =
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL;

      if (enabled) {
        console.log('Authorization status:', authStatus);
      }
    }
    requestUserPermission();
  }
};
