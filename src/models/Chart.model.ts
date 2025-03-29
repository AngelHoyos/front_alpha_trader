export interface ChartCustomProps {
  time: string;
  price: number;
}

export interface TypesProps {
    dia?: ChartCustomProps[];
    semana?: ChartCustomProps[];
    mes?: ChartCustomProps[];
    año?: ChartCustomProps[];
}

export interface CryptoChartProps{
    backgroundColor:string;
    title:string;
    data:TypesProps;
}
