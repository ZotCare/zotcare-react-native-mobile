import {useFocusEffect} from '@react-navigation/native';
import React, {useState} from 'react';
import {ScrollView} from 'react-native';
import {Text} from 'react-native-paper';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useDispatch, useSelector} from 'react-redux';

import CustomButton from '../../components/CustomButton';
import CustomModal from '../../components/CustomModal';
import Colors from '../../constants/Colors';
import {signOut} from '../../modules/auth/actions';

const HomeScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const [visibleLogout, setVisibleLogout] = useState(false);

  useFocusEffect(
    React.useCallback(() => {
      return () => {};
    }, []),
  );

  return (
    <SafeAreaView>
      <ScrollView>
        <CustomButton
          text={'Logout'}
          buttonColor={Colors.main_colors.secondaryColor}
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
        whiteText={'No'}
        pinkText={'Yes'}
        onPinkButtonPress={() => dispatch(signOut())}
        onWhiteButtonPress={() => setVisibleLogout(false)}
      />
    </SafeAreaView>
  );
};

export default HomeScreen;
