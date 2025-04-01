export interface Cuenta{
    total:number;
    gastado:number;
    restante:number;
}

export interface HistoryCoin{
    id:number;
    description:string;
    amount:number;
    result:string;
}
export interface AccountStatusProps {
cuenta:Cuenta;
historyCoins:HistoryCoin[];
}