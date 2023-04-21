import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useState} from 'react';
import {ScrollView, View} from 'react-native';
import {Notifier, NotifierComponents} from 'react-native-notifier';
import {Button} from 'react-native-paper';
import {SafeAreaView} from 'react-native-safe-area-context';
import {ScaledSheet} from 'react-native-size-matters';

import ProfileField from '@app/components/interaction-components/profile-field/profile-field';
import useLocalProfile from '@app/modules/user_profile/local';
import {
  useMutateProfile,
  useProfile,
  useProfileKeys,
} from '@app/modules/user_profile/service';
import {TabNavigatorParams} from '@app/navigation/tab-navigator';

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

  const handleAnswer = (key: string, local: boolean) => (value: any) => {
    if (local) {
      setNewLocalProfile(prevState => ({prevState, [key]: value}));
    } else {
      setNewCloudProfile(prevState => ({...prevState, [key]: value}));
    }
  };

  console.log('rerender');

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

  console.log('isSuccess', isSuccess);

  return (
    <SafeAreaView>
      <ScrollView>
        <View style={styles.container}>
          {isSuccess &&
            profileKeys.map((field: any, index: number) => {
              field.id = field.key;
              delete field.key;
              return (
                <ProfileField
                  handleAnswer={handleAnswer(field.id, field.local)}
                  value={getDefault(field.id)}
                  title={field.title || field.id}
                  {...field}
                  key={index.toString()}
                />
              );
            })}
          <Button onPress={handleSubmit}>Submit </Button>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    paddingLeft: 20,
    paddingRight: 20,
  },
});

export default ProfileScreen;
