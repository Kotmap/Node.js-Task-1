import { TClientModel, TClient } from './client.type';
import Client from './client.model';

const Clients: TClientModel[] = [];

const getAll = async (): Promise<TClientModel[]> => Clients;

const getById = async (id: string): Promise<TClientModel | null> =>
Clients.find((client) => client.id === id) || null;

const createClient = async ({ id, fullName, adress, numberPhone, bonusCard }: TClient): Promise<TClientModel> => {
  const client = new Client({ id, fullName, adress, numberPhone, bonusCard });
  Clients.push(client);
  return client;
};

const deleteById = async (id: string): Promise<TClientModel | null> => {
  const clientPosition = Clients.findIndex((client) => client.id === id);

  if (clientPosition === -1) return null;

  const clientDeletable = Clients[clientPosition];

  Clients.splice(clientPosition, 1);
  return clientDeletable!;
};

const updateById = async ({
  id,
    fullName,
    adress,
    numberPhone,
    bonusCard,
}: TClientModel): Promise<TClientModel | null> => {
  const clientPosition = Clients.findIndex((client) =>client.id === id);

  if (clientPosition === -1) return null;

  const oldClient = Clients[clientPosition];
  const newClient = { ...oldClient, id, fullName, adress, numberPhone, bonusCard };

  Clients.splice(clientPosition, 1, newClient);
  return newClient!;
};

export default {
  Clients,
  getAll,
  getById,
  createClient,
  deleteById,
  updateById,
};