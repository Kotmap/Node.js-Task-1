import ordersRepo from './orders.memory.repository';
import { TOrders, TOrdersModel } from './orders.type';
import productsRepo from '../products/products.memory.repository';

const getAll = async (): Promise<TOrdersModel[]> => ordersRepo.getAll();
const getById = async (id: string): Promise<TOrdersModel | null> => ordersRepo.getById(id);

const createOrders = async ({ productId, columns, numbers, orderNumber, clientId }: TOrders): Promise<TOrdersModel> =>
  ordersRepo.createOrders({ productId, columns, numbers, orderNumber, clientId });

const deleteById = async (id: string): Promise<TOrdersModel | null> => {
  const boardDeletable = await getById(id);
  ordersRepo.deleteById(id);
  productsRepo.deleteByOrdersId(id);

  return boardDeletable;
};

const updateById = async (board: TOrdersModel): Promise<TOrdersModel | null> =>
  ordersRepo.updateById(board);

export default { getAll, getById, createOrders, deleteById, updateById };