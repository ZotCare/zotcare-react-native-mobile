import React from 'react';
import {StyleSheet, View, Text, PixelRatio} from 'react-native';
import PropTypes from 'prop-types';
import Touchable from 'react-native-platform-touchable';
import {connect} from 'react-redux';
import {Notifier} from 'react-native-notifier';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import sharedStyles from '../../views/Styles';
import Colors from '../../constants/Colors';

import {useOrientation} from '../../dimensions';
import {NavigationService} from '../../navigation';

export const ROW_HEIGHT = 75 * PixelRatio.getFontScale();
const AVATAR_SIZE = 48;
const BUTTON_HIT_SLOP = {
  top: 12,
  right: 12,
  bottom: 12,
  left: 12,
};

const styles = StyleSheet.create({
  container: {
    height: ROW_HEIGHT,
    paddingHorizontal: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: 10,
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 4,
  },
  content: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  inner: {
    flex: 1,
    paddingLeft: 10,
  },
  avatar: {
    marginRight: 10,
  },
  roomName: {
    fontSize: 17,
    lineHeight: 20,
    ...sharedStyles.textMedium,
  },
  message: {
    fontSize: 14,
    lineHeight: 17,
    ...sharedStyles.textRegular,
  },
  close: {
    marginLeft: 10,
  },
  small: {
    width: '50%',
    alignSelf: 'center',
  },
});

const hideNotification = () => Notifier.hideNotification();

const NotifierComponent = React.memo(({notification}) => {
  const theme = 'light';
  const insets = useSafeAreaInsets();
  const {isLandscape} = useOrientation();

  const {id, resource, action, status, user, room, created_at} = notification;
  let params = {
    refresh: true,
  };
  let route = '';

  switch (resource) {
    case 'friends':
      if (action == 'create') {
        text = 'New friend request form ' + user.name;
        route = 'FriendsList';
      } else if (action == 'update') {
        if (status == 'accepted') {
          text = user.name + ' accepted friend request';
          route = 'FriendsList';
        } else if (status == 'awaiting') {
          text = user.name + ' rejected friend request';
          route = 'FriendsList';
        }
      }
      break;
    case 'user_private_rooms':
      if (status == 'invited') {
        text = 'New room invitation form ' + user.name;
        route = 'PrivateRoom';
      } else if (status == 'joined') {
        if (action == 'created') {
          text = user.name + ' joined the room';
          route = 'PrivateRoom';
        } else {
          text = user.name + ' accepted invitation';
          route = 'PrivateRoom';
        }
      } else if (status == 'leaved') {
        text = user.name + ' leaved the room';
        route = 'PrivateRoom';
      } else if (status == 'removed') {
        text = user.name + ' removed from the room';
        route = 'PrivateRoom';
      }
      break;
    case 'private_rooms':
      text = 'The room was closed by ' + user.name;
      route = 'PrivateRoom';
      break;
    case 'tournaments':
      text = 'Tournament round is pre started';
      if (status == 'pre_started') {
        text = 'Tournament round is pre started';
      } else if (status == 'started') {
        text = 'Tournament round is started';
      } else if (status == 'finished') {
        text = 'Tournament round is finished';
      }
      route = '';
    default:
      break;
  }

  const onPress = () => {
    //console.log('navigate', route)
    NavigationService.navigate('tab', {screen: route, params});

    hideNotification();
  };

  return (
    <View
      style={[
        styles.container,
        isLandscape && styles.small,
        {
          backgroundColor: Colors.themes[theme].focusedBackground,
          borderColor: Colors.themes[theme].separatorColor,
          marginTop: insets.top,
        },
      ]}>
      <Touchable
        style={styles.content}
        onPress={onPress}
        hitSlop={BUTTON_HIT_SLOP}
        background={Touchable.SelectableBackgroundBorderless()}>
        <>
          <CustomAvatar
            name={user?.name}
            image={{uri: user?.image?.small}}
            size={AVATAR_SIZE}
            fontSize={10}
          />
          <View style={styles.inner}>
            {/* <Text style={[styles.roomName, { color: Colors.themes[theme].titleText }]} numberOfLines={1}>{title}</Text> */}
            <Text
              style={[styles.message, {color: Colors.themes[theme].titleText}]}
              numberOfLines={1}>
              {text}
            </Text>
          </View>
        </>
      </Touchable>
      <Touchable
        onPress={hideNotification}
        hitSlop={BUTTON_HIT_SLOP}
        background={Touchable.SelectableBackgroundBorderless()}>
        <MaterialIcons
          name="close"
          style={[styles.close, {color: Colors.themes[theme].titleText}]}
          size={20}
        />
        {/* <CustomIcon name='close' style={[styles.close, { color: Colors.themes[theme].titleText }]} size={20} /> */}
      </Touchable>
    </View>
  );
});

NotifierComponent.propTypes = {
  notification: PropTypes.object,
};

const mapStateToProps = state => ({});

export default connect(mapStateToProps)(NotifierComponent);
