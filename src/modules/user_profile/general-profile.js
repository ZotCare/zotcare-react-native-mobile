import {useProfile} from './service';
import useLocalProfile from './local';

const useGeneralProfile = () => {
  const {data: cloudProfile, status: cloudProfileStatus} = useProfile();
  const {data: localProfile, loading: localProfileLoading} = useLocalProfile();

  const getItem = key => {
    if (key in cloudProfile) {
      return cloudProfile[key];
    } else if (key in localProfile) {
      return localProfile[key];
    } else {
      return null;
    }
  };

  return {
    loading: !(
      cloudProfileStatus === 'success' && localProfileLoading === false
    ),
    getItem,
  };
};

export default useGeneralProfile;
