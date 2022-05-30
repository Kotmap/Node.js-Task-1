export interface TProducts  {
  name: string | null;
  price: number;
  ageOfIssue: number;
  lifeTime: number;
  clientId: string| null;
  ordersId: string| null;
  }
  
  export interface TProductsModel extends TProducts {
    id: string;
  }

