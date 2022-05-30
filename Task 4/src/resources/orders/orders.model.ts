import { v4 as uuid } from 'uuid';
import { TOrdersModel, TOrders, TColumn } from './orders.type';

class Orders {

  id: string;

  clientId: string | null;

  productId: string | null;

  numbers: number;

  orderNumber: number;

  columns: TColumn[];

  constructor({
    clientId = null,
    productId = null,
    numbers = 0,
    orderNumber = 0,
    columns = []
  }: Partial<TOrders> = {}) {
    this.id = uuid();
    this.clientId = clientId;
    this.productId = productId;
    this.numbers = numbers;
    this.orderNumber = orderNumber;
    this.columns = columns
  }

  static toResponse(board: TOrdersModel): TOrdersModel {
    const { id, productId, columns, numbers, orderNumber, clientId  } = board;
    return { id, productId, columns, numbers, orderNumber, clientId };
  }
}

export default Orders;