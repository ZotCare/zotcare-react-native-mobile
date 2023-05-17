import 'react-native-gesture-handler/jestSetup';

import {jest} from '@jest/globals';

jest.mock('react-native/Libraries/EventEmitter/NativeEventEmitter');
jest.mock('@ronradtke/react-native-markdown-display');

// source: https://react-native-async-storage.github.io/async-storage/docs/advanced/jest/
jest.mock('@react-native-async-storage/async-storage', () =>
  require('@react-native-async-storage/async-storage/jest/async-storage-mock'),
);

jest.mock('react-native-device-info', () => {
  return {
    __esModule: true,
    default: jest.fn(() => {}),
    getUniqueId: () => 4,
  };
});

jest.mock('@react-native-firebase/app', () => {
  return () => ({
    onNotification: jest.fn(),
    onNotificationDisplayed: jest.fn(),
  });
});

jest.mock('@react-native-firebase/messaging', () => {
  return () => ({
    hasPermission: jest.fn(() => Promise.resolve(true)),
    subscribeToTopic: jest.fn(),
    unsubscribeFromTopic: jest.fn(),
    requestPermission: jest.fn(() => Promise.resolve(true)),
    getToken: jest.fn(() => Promise.resolve('myMockToken')),
    onMessage: jest.fn(),
    onNotificationOpenedApp: jest.fn(),
    getInitialNotification: jest.fn(() => Promise.resolve(false)),
    setBackgroundMessageHandler: jest.fn(() =>
      Promise.resolve('Message handled in the background!'),
    ),
  });
});

jest.mock('react-native-reanimated', () => {
  const Reanimated = require('react-native-reanimated/mock');

  // The mock for `call` immediately calls the callback which is incorrect
  // So we override it with a no-op
  Reanimated.default.call = () => {};

  return Reanimated;
});

jest.mock(
  'react-native-exception-handler',
  () => 'react-native-exception-handler',
);

jest.mock('react-native-exception-handler', () => {
  return {
    setJSExceptionHandler: jest.fn(() => Promise.resolve(true)),
    setNativeExceptionHandler: jest.fn(() => Promise.resolve(true)),
  };
});

// Mock vector-icons
// ask about material-icon names
jest.mock('react-native-vector-icons', () => {
  return {
    createIconSetFromIcoMoon: jest.fn(),
  };
});

jest.mock('react-native-vector-icons/Feather', () => 'Icon');
jest.mock('react-native-vector-icons/FontAwesome', () => 'FIcon');
jest.mock('react-native-vector-icons/MaterialIcons', () => 'Icon');
jest.mock('react-native-vector-icons/Ionicons', () => 'Icon');
