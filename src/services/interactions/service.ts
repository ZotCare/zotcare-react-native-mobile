import {useQuery} from 'react-query';

import {fetchInteractionById, fetchInteractions} from './api';

export const useInteractions = () =>
  useQuery(['interactions'], fetchInteractions);

export const useInteraction = (id: string) => {
  return useQuery({
    queryKey: ['interactions', id],
    queryFn: () => fetchInteractionById(id),
  });
};
