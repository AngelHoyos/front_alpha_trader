import { faArrowDown, faArrowUp } from "@fortawesome/free-solid-svg-icons";

export interface Coin {
  id: string;
  icon: string;
  moneda: string;
  estado: string;
  iconEstado: typeof faArrowUp | typeof faArrowDown;
  valor: number;
}

export interface TopCoinsProps {
  coinsData: Coin[];
}