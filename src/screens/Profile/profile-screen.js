import {ScaledSheet} from 'react-native-size-matters';
import {SafeAreaView} from 'react-native-safe-area-context';
import {ScrollView, View} from 'react-native';
import {
  useMutateProfile,
  useProfile,
  useProfileKeys,
} from '../../modules/user_profile/service';
import {Button} from 'react-native-paper';
import React, {useState} from 'react';
import ProfileField from '../../components/interaction-components/profile-field/profile-field';
import useLocalProfile from '../../modules/user_profile/local';
import {Notifier} from 'react-native-notifier';

const ProfileScreen = ({navigation}) => {
  const {data: profileKeys, status} = useProfileKeys();
  const {data: profile, status: profileStatus} = useProfile();
  const {mutateAsync: mutateProfile} = useMutateProfile();
  const [newCloudProfile, setNewCloudProfile] = useState({});
  const [newLocalProfile, setNewLocalProfile] = useState({});
  const {
    profile: localProfile,
    setProfile: setLocalProfile,
    loading: localLoading,
  } = useLocalProfile();

  const handleAnswer = (key, local) => value => {
    if (local) {
      setNewLocalProfile({...newLocalProfile, [key]: value});
    } else {
      setNewCloudProfile({...newCloudProfile, [key]: value});
    }
  };

  const getDefault = key => {
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
      type: 'success',
    });
    navigation.navigate('Home');
  };

  return (
    <SafeAreaView>
      <ScrollView>
        <View style={styles.container}>
          {status === 'success' &&
            profileStatus === 'success' &&
            localLoading === false &&
            profileKeys.map((field, index) => {
              return (
                <ProfileField
                  key={index.toString()}
                  handleAnswer={handleAnswer(field.key, field.local)}
                  value={getDefault(field.key)}
                  {...field}
                />
              );
            })}
          <Button onPress={handleSubmit}>Submit</Button>
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
