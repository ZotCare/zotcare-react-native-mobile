import * as React from 'react';
import {
  View,
  Image,
  Pressable,
  Text,
  ImageBackground,
  Platform,
} from 'react-native';
import {Appbar, Title, Avatar} from 'react-native-paper';
import Colors from '../constants/Colors';
import {
  moderateScale,
  scale,
  ScaledSheet,
  verticalScale,
} from 'react-native-size-matters';
import {NavigationService} from '../navigation';
import images from '../assets/images';
import Layout from '../constants/Layout';
import {verifyCode} from '../modules/auth/actions';

export default ImageHeader = ({text, image, haveBackBtn}) => {
  const back = haveBackBtn && (
    <Pressable onPress={() => NavigationService.getNavigator().goBack()}>
      <Image style={styles.image} source={images.backIconWhite} />
    </Pressable>;

  return (
    <Appbar.Header
      statusBarHeight={5}
      style={[
        styles.container,
        {height: !!text ? verticalScale(260) : verticalScale(260)},
      ]}>
      <ImageBackground
        source={image}
        imageStyle={{resizeMode: 'cover'}}
        style={[
          styles.container,
          {
            justifyContent: 'flex-start',
            width: '100%',
            height: '100%',
            marginVertical: -35,
          },
        ]}>
        <View
          style={{
            marginTop: Platform.OS == 'ios' ? verticalScale(35) : 0,
            marginHorizontal: Layout.marginHorizontal,
            flex: 1,
            alignItems: 'stretch',
            justifyContent: 'flex-start',
          }}>
          {back}
          {!!text && <Title style={styles.title}>{text}</Title>}
        </View>
      </ImageBackground>
    </Appbar.Header>
  );
};

const styles = ScaledSheet.create({
  container: {
    backgroundColor: Colors.backgroundColor,
    elevation: 0,
  },
  view: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: Layout.marginHorizontal,
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
    fontWeight: '900',
    marginHorizontal: '1@s',
  },
  image: {
    // backgroundColor: "#7C6DE2"
  },
  title: {
    color: Colors.main_colors.whiteText,
    fontWeight: '900',
    marginTop: '10@vs',
  },
})
