import 'react-native-gesture-handler';

import messaging from '@react-native-firebase/messaging';
import React, {useEffect, useRef, useState} from 'react';
import {AppState, AppStateStatus, LogBox, Platform, View} from 'react-native';
import {
  setJSExceptionHandler,
  setNativeExceptionHandler,
} from 'react-native-exception-handler';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {NotifierWrapper} from 'react-native-notifier';
import {
  DefaultTheme,
  Portal,
  Provider as PaperProvider,
  Text,
} from 'react-native-paper';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {focusManager, QueryClient, QueryClientProvider} from 'react-query';
import {Provider} from 'react-redux';

import CustomModal from '@components/CustomModal';
import paper_theme from '@constants/paper_theme';

import createStore from './createStore';
import {getErrorMessages, getErrors, getLoadings} from './libs/utils';
import * as authConstant from './modules/auth/constants';
import RootNavigator from './navigation/navigator';
import rootReducers from './reducers';
import sagas from './sagas';
import handleError from './utils/error';
import {
  handleForegroundNotification,
  handlePress,
  requestPermission,
  sendToken,
} from './utils/firebase';

messaging().setBackgroundMessageHandler(async remoteMessage => {
  console.log('Message handled in the background!', remoteMessage);
});

setJSExceptionHandler((error, isFatal) => {
  console.log('JS Exception Handler', error, isFatal);
});
setNativeExceptionHandler(exceptionString => {
  console.log('Native Exception Handler', exceptionString);
});
LogBox.ignoreAllLogs(true);
// (window as any).navigator.userAgent = 'ReactNative';

const {store} = createStore(rootReducers, sagas);
export {store};

let sentToken = false;
store.subscribe(async () => {
  const token = store.getState()?.auth.token;
  if (token && !sentToken) {
    await sendToken();
    sentToken = true;
  }
});

const theme = {
  ...DefaultTheme,
  ...paper_theme,
};

// onlineManager.setEventListener(setOnline => {
//   return NetInfo.addEventListener(state => {
//     setOnline(state.isConnected == null ? undefined : state.isConnected);
//   });
// });
function onAppStateChange(status: AppStateStatus) {
  if (Platform.OS !== 'web') {
    focusManager.setFocused(status === 'active');
  }
}
const queryClient = new QueryClient();

const App = () => {
  const appState = useRef(AppState.currentState);
  const [appStateVisible, setAppStateVisible] = useState(appState.current);
  const [visible, setVisible] = useState(false);
  const [text, setText] = useState('');

  useEffect(() => {
    const subscription = AppState.addEventListener('change', onAppStateChange);
    return () => subscription.remove();
  }, []);

  useEffect(() => {
    store.subscribe(() => {
      let errors = getErrors(store.getState());
      let error = handleError({
        errors,
        message: getErrorMessages(store.getState()),
      });
      if (error.error && !visible) {
        console.log('Error:', error);
        setVisible(error.error);
        if (error.message.DONE) {
          setText('Error');
        } else {
          if (error.message.error) {
            setText(error.message.error);
          } else {
            setText(error.message);
          }
        }
      }

      let loadings = getLoadings(store.getState());
    });
  }, []);

  useEffect(() => {
    if (visible) {
      setTimeout(() => {
        store.dispatch({
          type: authConstant.CLEAR_ERRORS,
        });
        setVisible(false);
        setText('');
      }, 1500);
    }
  }, [visible]);

  useEffect(() => {
    requestPermission();
  }, []);

  useEffect(() => {
    return messaging().onMessage(handleForegroundNotification);
  }, []);

  useEffect(() => {
    return messaging().onNotificationOpenedApp(remoteMessage =>
      handlePress(remoteMessage.data),
    );
  }, []);

  // const _handleAppStateChange = nextAppState => {
  // if (appState.current.match(/inactive|background/) && nextAppState === "active") {

  // }
  // appState.current = nextAppState;
  // setAppStateVisible(appState.current);
  //console.log("AppState", appState.current);
  // };

  return (
    <SafeAreaProvider>
      <GestureHandlerRootView style={{flex: 1}}>
        <Provider store={store}>
          <NotifierWrapper>
            <PaperProvider theme={theme}>
              <QueryClientProvider client={queryClient}>
                <RootNavigator />
                <Portal>
                  <CustomModal
                    visible={visible}
                    onBackdropPress={() => setVisible(false)}
                    component={
                      <View style={{justifyContent: 'center'}}>
                        <Text
                          style={{
                            textAlign: 'center',
                          }}>
                          {text}
                        </Text>
                      </View>
                    }
                  />
                </Portal>
              </QueryClientProvider>
            </PaperProvider>
          </NotifierWrapper>
        </Provider>
      </GestureHandlerRootView>
    </SafeAreaProvider>
  );
};

export default App;
