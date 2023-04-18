import {useQuery, useQueryClient} from 'react-query';

import {Interaction} from '@app/models/interaction';

import {fetchInteractionById, fetchInteractions} from './api';

export const useInteractions = () =>
  useQuery(['interactions'], fetchInteractions);

export const useInteraction = (id: string) => {
  const queryClient = useQueryClient();
  return useQuery({
    queryKey: ['interactions', id],
    queryFn: () => fetchInteractionById(id),
    initialData: () => {
      const allInteractions = queryClient.getQueryData<Interaction[]>([
        'interactions',
      ]);
      return allInteractions?.find(interaction => interaction.id === id);
    },
  });
};
