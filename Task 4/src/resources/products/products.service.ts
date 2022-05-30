import productsRepo from './products.memory.repository';
import { TProducts, TProductsModel } from './products.type';

const getAll = async (): Promise<TProductsModel[]> => productsRepo.getAll();
const getById = async (id: string): Promise<TProductsModel | null> => productsRepo.getById(id);

const createProducts = async ({
    name,
    price,
    ageOfIssue,
    lifeTime,
    ordersId,
    clientId
}: TProducts): Promise<TProductsModel> =>
productsRepo.createProducts({
    name,
    price,
    ageOfIssue,
    lifeTime,
    ordersId,
    clientId
  });

const deleteById = async (id: string): Promise<TProductsModel | null> => productsRepo.deleteById(id);

const updateById = async (products: TProductsModel): Promise<TProductsModel | null> =>
productsRepo.updateById(products);

export default { getAll, getById, createProducts, deleteById, updateById };
