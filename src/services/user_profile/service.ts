import {useMutation, useQuery, useQueryClient} from 'react-query';

import {fetchProfile, fetchProfileKeys, modifyProfile} from './api';

export const useProfile = () => useQuery(['profile'], fetchProfile);

export const useMutateProfile = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: modifyProfile,
    onMutate: async newProfile => {
      await queryClient.cancelQueries(['profile']);
      const previousProfile = queryClient.getQueryData(['profile']);
      queryClient.setQueryData(['profile'], newProfile);
      return {previousProfile};
    },
    onError: (err, newProfile, context) => {
      queryClient.setQueryData(['profile'], context?.previousProfile);
    },
    onSuccess: profile => {
      queryClient.setQueriesData(['profile'], profile);
    },
  });
};

export const useProfileKeys = () =>
  useQuery(['profile-keys'], fetchProfileKeys);
