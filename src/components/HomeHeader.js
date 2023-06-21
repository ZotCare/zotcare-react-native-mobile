import * as React from 'react';
import {Image, Pressable, Text, View} from 'react-native';
import {Appbar, Avatar, Title} from 'react-native-paper';
import {
  moderateScale,
  scale,
  ScaledSheet,
  verticalScale,
} from 'react-native-size-matters';
import {useSelector} from 'react-redux';

import images from '../assets/images';
import Colors from '../constants/Colors';
import Layout from '../constants/view';
import {getProfile} from '../modules/profile/selectors';
import {NavigationService} from '../navigation';

export default HomeHeader = ({text, link}) => {
  const profile = useSelector(state => getProfile(state));

  return (
    <Appbar.Header
      statusBarHeight={5}
      style={[
        styles.container,
        {height: text ? verticalScale(50) : verticalScale(40)},
        {marginTop: Platform.OS == 'ios' ? 0 : verticalScale(15)},
      ]}>
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Title style={styles.title}>{text}</Title>
      </View>
    </Appbar.Header>
  );
};

const styles = ScaledSheet.create({
  container: {
    backgroundColor: Colors.main_colors.tabBackground,
    elevation: 0,
  },
  view: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: Layout.marginHorizontal,
  },
  view2: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    // marginHorizontal: Layout.marginHorizontal,
  },
  subView: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  currenciesView: {
    justifyContent: 'flex-end',
  },
  currenciesSubView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    color: Colors.main_colors.currenciesTextColor,
    fontWeight: Platform.OS == 'ios' ? '900' : 'bold',
    marginHorizontal: '1@s',
  },
  image: {
    backgroundColor: '#7C6DE2',
  },
  title: {
    color: Colors.main_colors.whiteText,
    fontWeight: Platform.OS == 'ios' ? '900' : 'bold',
    marginHorizontal: Layout.marginHorizontal,
    marginTop: '10@vs',
  },
});
