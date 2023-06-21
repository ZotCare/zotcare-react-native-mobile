import Uris from '@app/constants/Uris';
import type {Interaction} from '@app/models/interaction';
import request from '@app/utils/request';

export const fetchInteractions = async (): Promise<Interaction[]> => {
  const response = await request.get(Uris.interactions);
  return response.data;
};

export const fetchInteractionById = async (
  id: string,
): Promise<Interaction> => {
  const response = await request.get(`${Uris.interactions}/${id}`);
  return response.data;
};

export const submitInteraction = async (
  id: string,
  submission: any,
  metadata: any,
): Promise<any> => {
  const response = await request.post(
    `${Uris.interactions}/${id}/submissions`,
    {data: submission, metadata},
  );
  return response.data;
};
