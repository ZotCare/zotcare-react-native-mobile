/**
 * @format
 */

import 'react-native';

import React from 'react';
// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

import App from '@app/App';

// jest.mock('react-native/Libraries/EventEmitter/NativeEventEmitter');
// jest.mock('@ronradtke/react-native-markdown-display');
// jest.mock('@react-native-async-storage/async-storage', () =>
//   require('@react-native-async-storage/async-storage/jest/async-storage-mock'),
// );
// jest.mock('react-native-device-info', () => {
//   return {
//     __esModule: true,
//     default: jest.fn(() => {}),
//   };
// });

// jest.mock('@react-native-firebase/messaging', () => {
//   return () => ({
//     hasPermission: jest.fn(() => Promise.resolve(true)),
//     subscribeToTopic: jest.fn(),
//     unsubscribeFromTopic: jest.fn(),
//     requestPermission: jest.fn(() => Promise.resolve(true)),
//     getToken: jest.fn(() => Promise.resolve('myMockToken')),
//     onMessage: jest.fn(),
//     onNotificationOpenedApp: jest.fn(),
//     getInitialNotification: jest.fn(() => Promise.resolve(false)),
//     setBackgroundMessageHandler: jest.fn(() =>
//       Promise.resolve('Message handled in the background!'),
//     ),
//   });
// });

// jest.mock('react-native-exception-handler');

// jest.mock('@react-native-firebase/app', () => {
//   return () => ({
//     onNotification: jest.fn(),
//     onNotificationDisplayed: jest.fn(),
//   });
// });

it('renders correctly', () => {
  renderer.create(<App />);
});
