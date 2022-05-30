import { v4 as uuid } from 'uuid';
import { TProductsModel, TProducts } from './products.type';

class Products {
  id: string;

  name: string | null;

  price: number;

  ageOfIssue: number;

  lifeTime: number;

  clientId: string| null;

  ordersId: string| null;

  constructor({
    name = null,
    price = 0,
    ageOfIssue = 0,
    lifeTime = 0,
    clientId = null,
    ordersId = null
  }: Partial<TProducts> = {}) {
    this.id = uuid();
    this.name = name;
    this.price = price;
    this.ageOfIssue = ageOfIssue;
    this.lifeTime = lifeTime;
    this.clientId = clientId;
    this.ordersId = ordersId;
  }

  static toResponse(products: TProductsModel): TProductsModel {
    const { id, name, price, ageOfIssue, lifeTime, clientId,  ordersId} = products;
    return { id, name, price, ageOfIssue, lifeTime, clientId,  ordersId };
  }
}

export default Products;
