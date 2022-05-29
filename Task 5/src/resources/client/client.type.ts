export interface TClient {
    id: string;
  fullName: string | null;
  adress: string | null;
  numberPhone: number;
  bonusCard: boolean;
}
  export interface TClientModel extends TClient {
    id: string;
  }

  export interface TClientResponse extends TClient {
    id: string;
  }