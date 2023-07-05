import React, {useState} from 'react';
import {ScrollView} from 'react-native';
import {Button, Text} from 'react-native-paper';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useDispatch} from 'react-redux';

import {signOut} from '@app/modules/auth/actions';
import CustomModal from '@components/CustomModal';

const HomeScreen = () => {
  const dispatch = useDispatch();
  const [visibleLogout, setVisibleLogout] = useState(false);

  return (
    <SafeAreaView>
      <ScrollView>
        <Button
          mode="contained"
          onPress={() => {
            setVisibleLogout(true);
          }}>
          Log Out
        </Button>
      </ScrollView>
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
    </SafeAreaView>
  );
};

export default HomeScreen;
