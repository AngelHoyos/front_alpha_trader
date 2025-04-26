import { DataUser } from "./DataUserRegister.model";

export interface ProfileInfoProps {
  userData: DataUser;
  handleSave: () => void;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  openModal: boolean;
  handleCloseModal: () => void;
}

export interface CoinPreferencesProps {
  availableCoins: string[];
  selectedCoins: string[];
  onChange: (updatedCoins: string[]) => void;
}

export interface ProfileResponse {
  status: boolean;
  message: string;
  data: {
    status: boolean;
    message: string;
    data: any | null;
  };
}

export interface CoinProfile {
  name: string;
  symbol: string;
}
export interface ApiResponse {
  status: boolean;
  message: string;
  data: CoinProfile[];
}

export interface ApiResponseTwo<T = any> {
  status: boolean;
  message: string;
  data?: T;
}

export interface ResponseProfilePreferences {
  coins: string[]; 
  RiskTolerance: "Bajo" | "Medio" | "Alto";
  InvestmentHorizon: "Corto" | "Medio" | "Largo";
  FinancialMotivations: string; 
  ExperienceInCryptomonedas: "Ninguna" | "Baja" | "Media" | "Alta";
  SpecificInterest: string[]; 
}
