import Products from './products.model';
import { TProducts, TProductsModel } from './products.type';

const PRODUCTS: TProductsModel[] = [];

const getAll = async (): Promise<TProductsModel[]> => PRODUCTS;

const getById = async (id: string): Promise<TProductsModel | null> =>
  PRODUCTS.find((products) => products.id === id) || null;

const createProducts = async ({
  name,
    price,
    ageOfIssue,
    lifeTime,
    clientId,
    ordersId
}: TProducts): Promise<TProductsModel> => {
  const products = new Products({
    name,
    price,
    ageOfIssue,
    lifeTime,
    clientId,
    ordersId
  });
  PRODUCTS.push(products);
  return products;
};

const deleteById = async (id: string): Promise<TProductsModel | null> => {
  const boardPosition = PRODUCTS.findIndex((products) => products.id === id);

  if (boardPosition === -1) return null;

  const productsDeletable = PRODUCTS[boardPosition]!;

  PRODUCTS.splice(boardPosition, 1);
  return productsDeletable;
};

const updateById = async ({ id, ...payload }: Partial<TProductsModel>): Promise<TProductsModel | null> => {
  const boardPosition = PRODUCTS.findIndex((products) => products.id === id);

  if (boardPosition === -1) return null;

  const oldBoard = PRODUCTS[boardPosition]!;
  const newBoard = { ...oldBoard, ...payload };

  PRODUCTS.splice(boardPosition, 1, newBoard);
  return newBoard;
};

 const removeClientById = async (id: string): Promise<void> => {
  const clientProducts = PRODUCTS.filter((products) => products.clientId === id);

  await Promise.allSettled(clientProducts.map(async (products) => updateById({ id: products.id, clientId: null })));
};

const deleteByOrdersId = async (ordersId: string): Promise<void> => {
  const boardProducts = PRODUCTS.filter((products) => products.ordersId === ordersId);

  await Promise.allSettled(boardProducts.map(async (products) => deleteById(products.id)));
};

export default {
  PRODUCTS,
  getAll,
  getById,
  createProducts,
  deleteById,
  updateById,
  removeClientById,
  deleteByOrdersId,
};