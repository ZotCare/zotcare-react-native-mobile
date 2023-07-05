import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useState} from 'react';
import {ScrollView, View} from 'react-native';
import {Notifier, NotifierComponents} from 'react-native-notifier';
import {Button} from 'react-native-paper';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {ScaledSheet} from 'react-native-size-matters';

import useLocalProfile from '@app/modules/user_profile/local';
import {
  useMutateProfile,
  useProfile,
  useProfileKeys,
} from '@app/modules/user_profile/service';
import {TabNavigatorParams} from '@app/navigation/tab-navigator';

import ProfileField from './components/profile-field/profile-field';

type Props = NativeStackScreenProps<TabNavigatorParams, 'Profile'>;

const ProfileScreen = ({navigation}: Props) => {
  const {data: profileKeys, status: keysStatus} = useProfileKeys();
  const {data: profile, status: profileStatus} = useProfile();
  const {mutateAsync: mutateProfile} = useMutateProfile();
  const [newCloudProfile, setNewCloudProfile] = useState({});
  const [newLocalProfile, setNewLocalProfile] = useState({});
  const {
    profile: localProfile,
    setProfile: setLocalProfile,
    loading: localLoading,
  } = useLocalProfile();
  const insets = useSafeAreaInsets();

  const handleAnswer = (key: string, local: boolean) => (value: any) => {
    if (local) {
      setNewLocalProfile(prevState => ({...prevState, [key]: value}));
    } else {
      setNewCloudProfile(prevState => ({...prevState, [key]: value}));
    }
  };

  const getDefault = (key: string) => {
    if (localProfile[key]) {
      return localProfile[key];
    }
    if (profile[key]) {
      return profile[key];
    }
    return undefined;
  };

  const handleSubmit = async () => {
    await mutateProfile({...profile, ...newCloudProfile});
    await setLocalProfile({...localProfile, ...newLocalProfile});
    Notifier.showNotification({
      title: 'Profile Updated',
      description: 'Your profile has been updated',
      Component: NotifierComponents.Alert,
      componentProps: {
        alertType: 'success',
      },
    });
    navigation.navigate('Home');
  };

  const isSuccess =
    keysStatus === 'success' && profileStatus === 'success' && !localLoading;

  return (
    <View
      style={{
        flex: 1,
        paddingTop: 0,
        paddingBottom: insets.bottom,
        paddingLeft: insets.left,
        paddingRight: insets.right,
      }}>
      <ScrollView contentContainerStyle={{flexGrow: 1}} bounces={false}>
        <View style={styles.container}>
          {isSuccess &&
            profileKeys.map((field: any, index: number) => {
              return (
                <ProfileField
                  key={index.toString()}
                  handleAnswer={handleAnswer(field.key, field.local)}
                  value={getDefault(field.key)}
                  title={field.title || field.key}
                  {...field}
                />
              );
            })}
        </View>
        <View style={styles.buttonContainer}>
          <Button mode="contained" onPress={handleSubmit}>
            Submit
          </Button>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = ScaledSheet.create({
  container: {
    paddingLeft: 20,
    paddingRight: 20,
    gap: 10,
  },
  buttonContainer: {
    marginTop: 'auto',
    paddingLeft: 20,
    paddingRight: 20,
  },
});

export default ProfileScreen;
