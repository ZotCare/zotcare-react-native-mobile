import React, {useEffect, useState} from 'react';
import {View, SafeAreaView, Text, ScrollView} from 'react-native';
import {ScaledSheet, verticalScale} from 'react-native-size-matters';
import {Header} from '../../components';
import Colors from '../../constants/Colors';
import {useDispatch, useSelector} from 'react-redux';
import {NavigationService} from '../../navigation';
import {getUUID, getProfile} from '../../modules/profile/selectors';
import * as profileActions from '../../modules/profile/actions';
import CustomAvatar from '../../components/CustomAvatar';
import {useFocusEffect} from '@react-navigation/native';

const ProfileScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const user_id = NavigationService.getActiveRouteParams()?.user_id;
  const uuid = useSelector(state => getUUID(state));
  const profile = useSelector(state => getProfile(state));
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    if (uuid) {
      setRefresh(false);
    }
  }, [uuid, refresh]);

  useEffect(() => {
    if (uuid) {
      dispatch(profileActions.getProfile());
    }
    // if(leaderboard.length == 0)
    //   dispatch(getLeaderboard())
    // if(friends.length == 0)
    //   dispatch(getFriends({ user_id, request_type: "accepted" }));
  }, [uuid]);

  useFocusEffect(
    React.useCallback(() => {
      return () => {};
    }, []),
  );

  return (
    <SafeAreaView>
      <Header
        haveBackBtn
        haveSettingBtn
        mode={'dark'}
        onMenuPress={() => NavigationService.navigate('EditProfile')}
      />
      <ScrollView>
        <View style={{alignItems: 'center'}}>
          <CustomAvatar
            name={profile.name}
            image={{uri: profile.avatar}}
            size={120}
            fontSize={40}
          />
          <Text style={styles.bigText}>{profile.name ?? ''}</Text>
          <Text style={styles.smallText}>{profile.biography ?? ''}</Text>
        </View>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-around',
            alignItems: 'center',
            marginTop: verticalScale(30),
          }}>
          <Text
            style={[
              styles.bigText,
              {
                color: Colors.main_colors.purpleText,
                flex: 1,
                textAlign: 'center',
              },
            ]}>
            {profile.num_of_games ?? '0'}
          </Text>
          <Text
            style={[
              styles.bigText,
              {
                color: Colors.main_colors.purpleText,
                flex: 1,
                textAlign: 'center',
              },
            ]}>
            {!!profile.num_of_wins &&
            !!profile.num_of_games &&
            profile.num_of_games > 0
              ? parseFloat(profile.num_of_wins / profile.num_of_games).toFixed(
                  1,
                ) *
                  100 +
                '%'
              : '0%'}
          </Text>
          <Text
            style={[
              styles.bigText,
              {
                color: Colors.main_colors.purpleText,
                flex: 1,
                textAlign: 'center',
              },
            ]}>
            {profile.score ?? '0'}
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProfileScreen;

const styles = ScaledSheet.create({
  container: {
    backgroundColor: Colors.backgroundColor,
    height: '100%',
    paddingBottom: '25@vs',
  },
  bigText: {
    fontSize: '35@ms',
    fontWeight: Platform.OS == 'ios' ? '900' : 'bold',
    color: Colors.main_colors.whiteText,
    marginTop: '10@vs',
  },
  smallText: {
    fontSize: '12@ms',
    fontWeight: '500',
    color: Colors.main_colors.whiteText,
    flex: 1,
    textAlign: 'center',
  },
});
