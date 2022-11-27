import {
  Platform,
  PermissionsAndroid,
  ToastAndroid
} from 'react-native';

export function hasContactPermission(callback){
  if (Platform.OS === 'ios' || Platform.OS === 'android' && Platform.Version < 23) {
    callback(true);
    return
  }
  else
    PermissionsAndroid.check(
      PermissionsAndroid.PERMISSIONS.READ_CONTACTS
    ).then(
      hasPermission => {
        if (hasPermission) {
          callback(true);
          return
        }
          PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.READ_CONTACTS
          ).then(status => {
            if (status === PermissionsAndroid.RESULTS.GRANTED) callback(true);

            if (status === PermissionsAndroid.RESULTS.DENIED) {
              ToastAndroid.show('READ_CONTACTS permission denied by user.', ToastAndroid.LONG);
            } else if (status === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
              ToastAndroid.show('READ_CONTACTS permission revoked by user.', ToastAndroid.LONG);
            }
            callback(false);
          }) 


      }
    );
} 


export function hasRecordPermission(callback){
  if (Platform.OS === 'ios' || Platform.OS === 'android' && Platform.Version < 23) {
    callback(true);
    return
  }
  else
    PermissionsAndroid.check(
      PermissionsAndroid.PERMISSIONS.RECORD_AUDIO
    ).then(
      hasPermission => {
        if (hasPermission) {
          callback(true);
          return
        }
          PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.RECORD_AUDIO
          ).then(status => {
            if (status === PermissionsAndroid.RESULTS.GRANTED) callback(true);

            if (status === PermissionsAndroid.RESULTS.DENIED) {
              ToastAndroid.show('RECORD_AUDIO permission denied by user.', ToastAndroid.LONG);
            } else if (status === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
              ToastAndroid.show('RECORD_AUDIO permission revoked by user.', ToastAndroid.LONG);
            }
            callback(false);
          }) 


      }
    );
} 

export function hasCameraPermission(callback){
  if (Platform.OS === 'ios' || Platform.OS === 'android' && Platform.Version < 23) {
    callback(true);
    return
  }
  else
    PermissionsAndroid.check(
      PermissionsAndroid.PERMISSIONS.CAMERA
    ).then(
      hasPermission => {
        if (hasPermission) {
          callback(true);
          return
        }
          PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.CAMERA
          ).then(status => {
            if (status === PermissionsAndroid.RESULTS.GRANTED) callback(true);

            if (status === PermissionsAndroid.RESULTS.DENIED) {
              ToastAndroid.show('CAMERA permission denied by user.', ToastAndroid.LONG);
            } else if (status === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
              ToastAndroid.show('CAMERA permission revoked by user.', ToastAndroid.LONG);
            }
            callback(false);
          }) 


      }
    );
} 

export function hasWriteExternalStoragePermission(callback){
  if (Platform.OS === 'ios' || Platform.OS === 'android' && Platform.Version < 23) {
    callback(true);
    return
  }
  else
    PermissionsAndroid.check(
      PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE
    ).then(
      hasPermission => {
        if (hasPermission) {
          callback(true);
          return
        }
          PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE
          ).then(status => {
            if (status === PermissionsAndroid.RESULTS.GRANTED) callback(true);

            if (status === PermissionsAndroid.RESULTS.DENIED) {
              ToastAndroid.show('WRITE_EXTERNAL_STORAGE permission denied by user.', ToastAndroid.LONG);
            } else if (status === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
              ToastAndroid.show('WRITE_EXTERNAL_STORAGE permission revoked by user.', ToastAndroid.LONG);
            }
            callback(false);
          }) 


      }
    );
} 


export function hasAlertWindowPermission(callback){
  if (Platform.OS === 'ios' || Platform.OS === 'android' && Platform.Version < 29) {
    callback(true);
    return
  }
  else
    PermissionsAndroid.check(
      PermissionsAndroid.PERMISSIONS.SYSTEM_ALERT_WINDOW
    ).then(
      hasPermission => {
        if (hasPermission) {
          callback(true);
          return
        }
          PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.SYSTEM_ALERT_WINDOW
          ).then(status => {
            if (status === PermissionsAndroid.RESULTS.GRANTED) callback(true);

            if (status === PermissionsAndroid.RESULTS.DENIED) {
              ToastAndroid.show('SYSTEM_ALERT_WINDOW permission denied by user.', ToastAndroid.LONG);
            } else if (status === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
              ToastAndroid.show('SYSTEM_ALERT_WINDOW permission revoked by user.', ToastAndroid.LONG);
            }
            callback(false);
          }) 
      }
    );
} 

export function hasUSE_FULL_SCREEN_INTENTPermission(callback){
  if (Platform.OS === 'ios' || Platform.OS === 'android' && Platform.Version < 29) {
    callback(true);
    return
  }
  else
    PermissionsAndroid.check(
      PermissionsAndroid.PERMISSIONS.USE_FULL_SCREEN_INTENT
    ).then(
      hasPermission => {
        if (hasPermission) {
          callback(true);
          return
        }
          PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.USE_FULL_SCREEN_INTENT
          ).then(status => {
            if (status === PermissionsAndroid.RESULTS.GRANTED) callback(true);

            if (status === PermissionsAndroid.RESULTS.DENIED) {
              ToastAndroid.show('USE_FULL_SCREEN_INTENT permission denied by user.', ToastAndroid.LONG);
            } else if (status === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
              ToastAndroid.show('USE_FULL_SCREEN_INTENT permission revoked by user.', ToastAndroid.LONG);
            }
            callback(false);
          }) 
      }
    );
}