import { v4 as uuid } from 'uuid';
import { TClientModel, TClient, TClientResponse } from './client.type';

class Client { 

  id: string;

  fullName: string | null;

  adress: string | null;

  numberPhone: number;

  bonusCard: boolean;

  constructor({
   fullName = null,
   adress = null,
   bonusCard = false,
   numberPhone = 0,
  }: Partial<TClient> = {}) {
    this.id = uuid();
    this.fullName = fullName;
    this.adress = adress;
    this.bonusCard = bonusCard;
    this.numberPhone = numberPhone;
  }

  static toResponse(client: TClientModel): TClientResponse {
    const { id, fullName, adress, numberPhone, bonusCard } = client;
    return { id, fullName, adress, numberPhone, bonusCard };

  }
}



export default Client;
