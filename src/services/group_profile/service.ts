import {useQuery} from 'react-query';

import {fetchGroupProfile} from '@app/services/group_profile/api';

export const useGroupProfile = () => {
  return useQuery({
    queryKey: ['group', 'profile'],
    queryFn: fetchGroupProfile,
  });
};
