import clientRepo from './client.memory.repository';
import { TClientModel, TClient } from './client.type';

 const getAll = async (): Promise<TClientModel[]> => clientRepo.getAll();
 
 const getById = async (id: string): Promise<TClientModel | null> => clientRepo.getById(id);
 
 const createClient = async ({
   id,
   fullName,
   adress,
   numberPhone,
   bonusCard,
 }: TClient): Promise<TClientModel> =>
   clientRepo.createClient({
    id,
    fullName,
    adress,
    numberPhone,
    bonusCard,
   });
 
 const deleteById = async (id: string): Promise<TClientModel | null> => clientRepo.deleteById(id);
 
 const updateById = async (task: TClientModel): Promise<TClientModel | null> =>
   clientRepo.updateById(task);

export default {getAll, getById, updateById, deleteById, createClient};