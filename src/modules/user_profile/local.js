import {useEffect, useState} from 'react';
import {useAsyncStorage} from '@react-native-async-storage/async-storage';

const useLocalProfile = () => {
  const [profile, setStateProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const {getItem: getStoredProfile, setItem: setStoredProfile} =
    useAsyncStorage('@profile');

  useEffect(() => {
    getStoredProfile().then(storedProfile => {
      setStateProfile(JSON.parse(storedProfile));
      setLoading(false);
    });
  }, []);

  const setProfile = async newProfile => {
    try {
      await setStoredProfile(JSON.stringify(newProfile));
      setStateProfile(newProfile);
    } catch (e) {
      throw e;
    }
  };

  return {profile, loading, setProfile};
};

export default useLocalProfile;
