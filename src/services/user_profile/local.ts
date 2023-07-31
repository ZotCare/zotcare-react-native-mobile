import {useAsyncStorage} from '@react-native-async-storage/async-storage';
import {useEffect, useState} from 'react';

type ProfileHook = {
  profile: any;
  loading: boolean;
  setProfile: (newProfile: any) => Promise<void>;
};

const useLocalProfile = (): ProfileHook => {
  const [profile, setStateProfile] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const {getItem: getStoredProfile, setItem: setStoredProfile} =
    useAsyncStorage('@profile');

  useEffect(() => {
    getStoredProfile().then(storedProfile => {
      setStateProfile(JSON.parse(storedProfile || '{}'));
      setLoading(false);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const setProfile = async (newProfile: any) => {
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
