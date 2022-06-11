export interface TColumn {
  id: string;
  productId: string;
}

export interface TOrders {
  productId: string | null;
  columns: TColumn[];
  numbers: number;
  orderNumber: number;
  clientId: string | null;
}

export interface TOrdersPartial extends Partial<TOrders> {}

export interface TOrdersModel extends TOrders {
  id: string;
}