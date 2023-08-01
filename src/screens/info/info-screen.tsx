import React, {useState} from 'react';
import {Button, Text} from 'react-native-paper';
import {useDispatch} from 'react-redux';

import {signOut} from '@app/services/auth/actions';
import CustomModal from '@components/CustomModal';
import MainView from '@components/layout/main-view/main-view';

export default () => {
  const dispatch = useDispatch();
  const [visibleLogout, setVisibleLogout] = useState(false);

  return (
    <MainView>
      <Button
        mode="contained"
        onPress={() => {
          setVisibleLogout(true);
        }}>
        Log Out
      </Button>
      <CustomModal
        visible={visibleLogout}
        hasButtons
        onBackdropPress={() => setVisibleLogout(false)}
        component={
          <Text
            style={{
              textAlign: 'center',
            }}>
            {'Are you sure you want to logout?'}
          </Text>
        }
        primaryText={'No'}
        secondaryText={'Yes'}
        onPrimaryButtonPress={() => setVisibleLogout(false)}
        onSecondaryButtonPress={() => dispatch(signOut())}
      />
    </MainView>
  );
};
