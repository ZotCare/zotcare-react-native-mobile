import {useQuery} from 'react-query';

import {fetchGroupProfile} from '@app/modules/group_profile/api';

export const useGroupProfile = () => {
  return useQuery({
    queryKey: ['group', 'profile'],
    queryFn: fetchGroupProfile,
  });
};
