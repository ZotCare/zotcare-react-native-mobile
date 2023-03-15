import useLocalProfile from './local';
import {useMutateProfile, useProfile, useProfileKeys} from './service';

type GeneralProfile = {
  loading: boolean;
  getItem: (key: string) => any;
  setItem: (key: string, value: any) => Promise<void>;
};

const useGeneralProfile = (): GeneralProfile => {
  const {data: cloudProfile, status: cloudProfileStatus} = useProfile();
  const {mutateAsync: setCloudProfile} = useMutateProfile();
  const {data: profileKeys, isLoading: loadingProfileKeys} = useProfileKeys();
  const {
    profile: localProfile,
    loading: localProfileLoading,
    setProfile: setLocalProfile,
  } = useLocalProfile();

  const getItem = key => {
    if (key in cloudProfile) {
      return cloudProfile[key];
    } else if (key in localProfile) {
      return localProfile[key];
    } else {
      return null;
    }
  };

  const setItem = async (key, value) => {
    profileKeys
      .filter(pk => pk.key === key)
      .forEach(async pk => {
        console.log('writing to', pk);
        if (pk.editable === false) {
          return;
        }
        if (pk.local) {
          await setLocalProfile({...localProfile, [key]: value});
        } else {
          await setCloudProfile({...cloudProfile, [key]: value});
        }
      });
  };

  return {
    loading: !(
      cloudProfileStatus === 'success' &&
      !localProfileLoading &&
      !loadingProfileKeys
    ),
    getItem,
    setItem,
  };
};

export default useGeneralProfile;
