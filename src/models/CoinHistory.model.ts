export interface CoinCustomPromps {
  id: number;
  iconMoneda: string;
  moneda: string;
  ltp:number;
  porcentaje:string;
  valor:number;
}

export interface PropsTable{
  data:CoinCustomPromps[];
}