import {useQuery, useQueryClient} from 'react-query';

import {fetchInteractionById, fetchInteractions} from './api';

export const useInteractions = () =>
  useQuery(['interactions'], fetchInteractions);

export const useInteraction = id => {
  const queryClient = useQueryClient();
  return useQuery({
    queryKey: ['interactions', id],
    queryFn: () => fetchInteractionById(id),
    initialData: () => {
      const allInteractions = queryClient.getQueryData(['interactions']);
      return allInteractions?.find(interaction => interaction.id === id);
    },
  });
};
