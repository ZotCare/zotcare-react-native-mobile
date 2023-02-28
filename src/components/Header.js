import * as React from 'react';
import {View, Image, Pressable, Platform} from 'react-native';
import {Appbar, Title, IconButton} from 'react-native-paper';
import Colors from '../constants/Colors';
import {scale, ScaledSheet, verticalScale} from 'react-native-size-matters';
import {NavigationService} from '../navigation';
import images from '../assets/images';

const Header = ({
  title,
  haveBackBtn,
  haveSettingBtn,
  mode = 'white',
  onBackPress,
  onMenuPress,
}) => {
  const back = haveBackBtn && (
    <Pressable
      onPress={
        onBackPress ?? (() => NavigationService.getNavigator().goBack())
      }>
      <Image
        style={styles.image}
        source={mode == 'dark' ? images.backIconWhite : images.backIcon}
      />
    </Pressable>;
  );
  const setting = haveSettingBtn && (
    <Pressable onPress={onMenuPress}>
      <Image style={styles.image} source={images.setting} />
    </Pressable>;
  );
  // <IconButton icon="chevron-left" size={24}
  //     onPress={() => NavigationService.getNavigator().goBack()} color={Colors.main_colors.backButtonIconColor} style={styles.icon}/>

  return (
    <Appbar.Header
      statusBarHeight={5}
      style={[
        styles.container,
        {
          marginTop:
            Platform.OS == 'ios' ? verticalScale(15) : verticalScale(25),
        },
      ]}>
      <View style={{marginHorizontal: scale(10), flex: 1}}>
        {(haveBackBtn || haveSettingBtn) && (
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            {back}
            {setting}
          </View>
        )}
        <Title
          style={[
            styles.title,
            {
              color:
                mode == 'dark' ? '#FFFFFF' : Colors.main_colors.headerTextColor,
            },
          ]}>
          {title}
        </Title>
      </View>
    </Appbar.Header>
  );
};

export default Header;

const styles = ScaledSheet.create({
  container: {
    backgroundColor: Colors.backgroundColor,
    elevation: 0,
    justifyContent: 'space-between',

    },
  title: {
    color: Colors.main_colors.headerTextColor,
    fontWeight: Platform.OS == 'ios' ? '900' : 'bold',
    fontSize: '28@ms',
    marginTop: '20@vs',

    },
  image: {
    marginHorizontal: '5@s',
  },
})
