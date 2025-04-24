import { createContext } from "react";
import { UserData } from "../models/ResponseToken";

export interface AuthContextType {
  token: string | null;
  userData: UserData | null;
  setToken: (token: string | null) => void;
  setUserData: (userData: UserData | null) => void;
}

export const AuthContext = createContext<AuthContextType>({
  token: null,
  userData: null,
  setToken: () => {},
  setUserData: () => {},
});
