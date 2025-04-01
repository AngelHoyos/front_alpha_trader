import { DataUser } from "./DataUserRegister.model";

export interface ProfileInfoProps {
  userData: DataUser;
  handleSave: () =>void;
  handleChange:(e:React.ChangeEvent<HTMLInputElement>) =>void;
}
