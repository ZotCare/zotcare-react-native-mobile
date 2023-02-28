import {useFocusEffect} from '@react-navigation/native';
import React from 'react';
import {Platform, SafeAreaView} from 'react-native';
import {ScaledSheet} from 'react-native-size-matters';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useDispatch, useSelector} from 'react-redux';

import Colors from '../../constants/Colors';
import Layout from '../../constants/Layout';
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

const styles = ScaledSheet.create({
  boxesView: {
    // height: "160@vs",
    flexDirection: 'row',
    alignItems: 'stretch',
    marginTop: '15@vs',
  },
  boxSubTextView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  box: {
    borderRadius: 10,
    backgroundColor: Colors.main_colors.boxesBackground,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginLeft: Layout.marginHorizontal,
    paddingBottom: '10@vs',
    paddingHorizontal: '20@s',
  },
  boxTexts: {
    color: Colors.main_colors.homeBoxTextsColor,
    fontWeight: Platform.OS == 'ios' ? '900' : 'bold',
    fontSize: '15@ms',
    textAlign: 'center',
    marginTop: '10@vs',
  },
  boxSubText: {
    color: Colors.main_colors.homeBoxSubTextsColor,
    fontWeight: Platform.OS == 'ios' ? '900' : 'bold',
    fontSize: '14@ms',
  },
  invitesView: {
    marginHorizontal: Layout.marginHorizontal,
    marginBottom: '15@vs',
  },
  inviteBoxes: {
    height: '145@vs',
    width: '125@s',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginTop: '10@vs',
    marginRight: '8@s',
    backgroundColor: '#D6DAED',
    // paddingVertical: "15@vs"
  },
  invitesText: {
    color: Colors.main_colors.whiteText,
    fontWeight: Platform.OS == 'ios' ? '900' : 'bold',
    fontSize: '20@ms',
  },
  image: {
    backgroundColor: Colors.main_colors.noImageBackground,
    resizeMode: 'cover',
    height: '145@vs',
    width: '125@s',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingBottom: '10@vs',
  },
  inviteBoxText: {
    color: Colors.main_colors.whiteText,
    fontWeight: '500',
    marginVertical: '5@vs',
  },
  vipPass: {
    alignItems: 'stretch',
    justifyContent: 'flex-start',
    paddingVertical: '15@vs',
    marginTop: '10@vs',
    overflow: 'hidden',
    // paddingHorizontal: Layout.paddingHorizontal,
    backgroundColor: Colors.main_colors.mainBoxColor,
  },
});
