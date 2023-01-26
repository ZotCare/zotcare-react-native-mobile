import request from '../../utils/request';
import Uris from '../../constants/Uris';
import type {Interaction} from '../../models/interaction';

export const fetchInteractions = async (): Promise<Interaction[]> => {
  const response = await request.get(Uris.interactions);
  return response.data;
};

export const fetchInteractionById = async (id): Promise<Interaction> => {
  const response = await request.get(`${Uris.interactions}/${id}`);
  return response.data;
};
