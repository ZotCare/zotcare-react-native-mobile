import React, { useEffect, useRef, useState } from 'react'
import { AppState, LogBox, NativeModules, Platform, Text, View } from 'react-native'
import RootNavigator from './navigation/navigator';
import { Provider as PaperProvider, DefaultTheme } from 'react-native-paper';
import Colors from './constants/Colors';
import { Provider } from 'react-redux'
import createStore from './createStore'
import rootReducers from './reducers'
import sagas from './sagas'
// import messaging from '@react-native-firebase/messaging';
import { setJSExceptionHandler, setNativeExceptionHandler } from 'react-native-exception-handler';
import { NotifierWrapper } from 'react-native-notifier';
import CustomModal from './components/CustomModal'
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { getErrors, getErrorMessages, getLoadings } from './libs/utils'
import handleError from './utils/error';

import * as authConstant from './modules/auth/constants'
import handleLoading from './utils/loading'

setJSExceptionHandler((error, isFatal) => {
  //postReq('/monitoring', { exceptionType: 0, exceptionString: JSON.parse(error) }, res => { });

});
setNativeExceptionHandler(exceptionString => {
  //postReq('/monitoring', { exceptionType: 1, exceptionString }, res => { });
});
LogBox.ignoreAllLogs(true);
window.navigator.userAgent = 'ReactNative';

const { store } = createStore(rootReducers, sagas)
export { store }

const theme = {
  ...DefaultTheme,
  roundness: 10,
  colors: {
    ...DefaultTheme.colors,
    primary: Colors.primaryColor,
    accent: Colors.secondaryColor,
    text: Colors.textOnBackgroundColor
  }
};

const activityStarter = NativeModules.ActivityStarter;

const App = () => {
  const appState = useRef(AppState.currentState);
  const [appStateVisible, setAppStateVisible] = useState(appState.current);
  const [visible, setVisible] = useState(false);
  const [id, setId] = useState(null);
  const [text, setText] = useState("")
  const [spinner, setSpinner] = useState(false);
  // const [loaded] = Font.useFonts({
  //   'brown-regular': require('./assets/fonts/Brown-Regular.ttf'),
  // });  

  useEffect(() => {  
    store.subscribe(()=>{
      
      let errors = getErrors(store.getState())
      let error = handleError({errors, message: getErrorMessages(store.getState())})
      if(error.error && !visible){
        console.log("errrrrr", error)
        setVisible(error.error)  
        if(!!error.message["DONE"])  
          setText("Error")
        else
          setText(error.message)    
      }  

      let loadings = getLoadings(store.getState())
    })
  }, []);

  useEffect(() => {
    if(visible)
      setTimeout(()=>{     
        console.log("herrr", visible)
        store.dispatch({
          type: authConstant.CLEAR_ERRORS
        })        
        setVisible(false)
        setText("")
      }, 1500)
  }, [visible])

  const _handleAppStateChange = (nextAppState) => {
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
            <RootNavigator />
            <CustomModal visible={visible} onBackdropPress={() => setVisible(false)} component={
              <View style={{justifyContent: "center"}}>
                <Text style={{fontSize: 17, fontWeight: Platform.OS == "ios" ? '900' : "bold", color: Colors.main_colors.whiteText, textAlign: "center"}}>{"OOPS!"}</Text>
                <Text style={{fontSize: 14, color: Colors.main_colors.whiteText, textAlign: "center"}}>{text}</Text>
              </View>
            }/>            
          </NotifierWrapper>
        </PaperProvider>
      </Provider>
    </SafeAreaProvider>
  )
}

export default App;