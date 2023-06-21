import React, {useState} from 'react';
import {ScrollView} from 'react-native';
import {Text} from 'react-native-paper';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useDispatch} from 'react-redux';

import {signOut} from '@app/modules/auth/actions';
import CustomButton from '@components/CustomButton';
import CustomModal from '@components/CustomModal';

const HomeScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const [visibleLogout, setVisibleLogout] = useState(false);

  return (
    <SafeAreaView>
      <ScrollView>
        <CustomButton
          text={'Logout'}
          onPress={() => {
            setVisibleLogout(true);
          }}
        />
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
        onPrimaryButtonPress={() => dispatch(signOut())}
        onSecondaryButtonPress={() => setVisibleLogout(false)}
      />
    </SafeAreaView>
  );
};

export default HomeScreen;
