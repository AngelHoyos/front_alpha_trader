import { DataUser } from "./DataUserRegister.model";

export interface ProfileInfoProps {
  userData: DataUser;
  handleSave: () => void;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  openModal: boolean;
  handleCloseModal: () => void;
}

export interface CoinPreferencesProps{
  availableCoins:string[];
  selectedCoins:string[];
  onChange:(updatedCoins:string[])=>void;
}