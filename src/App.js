import 'react-native-gesture-handler';
import React, {useEffect, useRef, useState} from 'react';
import {
  AppState,
  LogBox,
  NativeModules,
  Text,
  View,
} from 'react-native';
import RootNavigator from './navigation/navigator';
import {Provider as PaperProvider, DefaultTheme} from 'react-native-paper';
import {Provider} from 'react-redux';
import createStore from './createStore';
import rootReducers from './reducers';
import sagas from './sagas';
import {
  setJSExceptionHandler,
  setNativeExceptionHandler,
} from 'react-native-exception-handler';
import {NotifierWrapper} from 'react-native-notifier';
import CustomModal from './components/CustomModal';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {getErrors, getErrorMessages, getLoadings} from './libs/utils';
import handleError from './utils/error';

import * as authConstant from './modules/auth/constants';
import paper_theme from './constants/paper_theme';
import {QueryClient, QueryClientProvider} from 'react-query';

setJSExceptionHandler((error, isFatal) => {
  //postReq('/monitoring', { exceptionType: 0, exceptionString: JSON.parse(error) }, res => { });
});
setNativeExceptionHandler(exceptionString => {
  //postReq('/monitoring', { exceptionType: 1, exceptionString }, res => { });
});
LogBox.ignoreAllLogs(true);
window.navigator.userAgent = 'ReactNative';

const {store} = createStore(rootReducers, sagas);
export {store};

const theme = {
  ...DefaultTheme,
  colors: paper_theme.colors,
};

const queryClient = new QueryClient();

const App = () => {
  const appState = useRef(AppState.currentState);
  const [appStateVisible, setAppStateVisible] = useState(appState.current);
  const [visible, setVisible] = useState(false);
  const [id, setId] = useState(null);
  const [text, setText] = useState('');
  const [spinner, setSpinner] = useState(false);
  // const [loaded] = Font.useFonts({
  //   'brown-regular': require('./assets/fonts/Brown-Regular.ttf'),
  // });

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

  const _handleAppStateChange = nextAppState => {
    // if (appState.current.match(/inactive|background/) && nextAppState === "active") {

    // }
    appState.current = nextAppState;
    setAppStateVisible(appState.current);
    //console.log("AppState", appState.current);
  };
  return (
    <SafeAreaProvider>
      <Provider store={store}>
        <PaperProvider theme={theme}>
          <NotifierWrapper>
            <QueryClientProvider client={queryClient}>
              <RootNavigator />
              <CustomModal
                visible={visible}
                onBackdropPress={() => setVisible(false)}
                component={
                  <View style={{justifyContent: 'center'}}>
                    <Text
                      style={{
                        textAlign: 'center',
                      }}>
                      {'OOPS!'}
                    </Text>
                    <Text
                      style={{
                        fontSize: 14,
                        textAlign: 'center',
                      }}>
                      {text}
                    </Text>
                  </View>
                }
              />
            </QueryClientProvider>
          </NotifierWrapper>
        </PaperProvider>
      </Provider>
    </SafeAreaProvider>
  );
};

export default App;
