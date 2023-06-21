import {useFocusEffect} from '@react-navigation/native';
import React from 'react';
import {Platform, SafeAreaView} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useDispatch, useSelector} from 'react-redux';

import {getToken} from '../../modules/auth/selectors';
import {getUUID} from '../../modules/profile/selectors';

if (Platform.OS === 'ios') {
  Icon.loadFont();
}

const DevicesScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const uuid = useSelector(state => getUUID(state));
  const token = useSelector(getToken);

  useFocusEffect(
    React.useCallback(() => {
      return () => {};
    }, []),
  );

  return <SafeAreaView />;
};

export default DevicesScreen;
