import Orders from './orders.model';
import { TOrdersModel, TOrders } from './orders.type';

const ORDERS: TOrdersModel[] = [];

const getAll = async (): Promise<TOrdersModel[]> => ORDERS;

const getById = async (id: string): Promise<TOrdersModel | null> =>
  ORDERS.find((orders) => orders.id === id) || null;

const createOrders = async ({ productId, columns, numbers, orderNumber, clientId }: TOrders): Promise<TOrdersModel> => {
  const orders = new Orders({ productId, columns, numbers, orderNumber, clientId });
  ORDERS.push(orders);
  return orders;
};

const deleteById = async (id: string): Promise<TOrdersModel | null> => {
  const ordersPosition = ORDERS.findIndex((orders) => orders.id === id);

  if (ordersPosition === -1) return null;

  const ordersDeletable = ORDERS[ordersPosition]!;

  ORDERS.splice(ordersPosition, 1);
  return ordersDeletable;
};

const updateById = async ({ id, productId, columns, numbers, orderNumber, clientId }: TOrdersModel): Promise<TOrdersModel | null> => {
  const ordersPosition = ORDERS.findIndex((orders) => orders.id === id);

  if (ordersPosition === -1) return null;

  const oldOrders = ORDERS[ordersPosition]!;
  const newOrders = { ...oldOrders, productId, columns, numbers, orderNumber, clientId };

  ORDERS.splice(ordersPosition, 1, newOrders);
  return newOrders;
};

export default {
  ORDERS,
  getAll,
  getById,
  createOrders,
  deleteById,
  updateById,
};