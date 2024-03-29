import useLocalProfile from './local';
import {useMutateProfile, useProfile, useProfileKeys} from './service';

type GeneralProfile = {
  loading: boolean;
  getItem: (key: string) => any;
  setItem: (key: string, value: any) => Promise<void>;
  formatText: (text: string) => string;
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

  const getItem = (key: string) => {
    if (key in cloudProfile) {
      return cloudProfile[key];
    } else if (key in localProfile) {
      return localProfile[key];
    } else {
      return null;
    }
  };

  const setItem = async (key: string, value: any) => {
    profileKeys
      .filter((pk: {key: string}) => {
        return pk.key === key;
      })
      .forEach(async (pk: {editable: boolean; local: any}) => {
        if (!pk.editable) {
          return;
        }
        if (pk.local) {
          await setLocalProfile({...localProfile, [key]: value});
        } else {
          await setCloudProfile({...cloudProfile, [key]: value});
        }
      });
  };

  const formatText = (text: string): string => {
    return text.replace(/\{\{.*}}/g, (match: string) => {
      const key = match.split('|');
      let defaultValue = '';
      if (key.length > 1) {
        defaultValue = key[1];
      }
      return getItem(key[0]) || defaultValue;
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
    formatText,
  };
};

export default useGeneralProfile;
