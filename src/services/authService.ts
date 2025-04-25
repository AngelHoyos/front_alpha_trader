import axiosInstance from "../api/axiosInstance/axiosInstance";
import { DataUserLogin } from "../models/DataUserLogin.model";
import { ResponseToken } from "../models/ResponseToken";

export const loginUser = async (
  credentials: DataUserLogin
): Promise<ResponseToken> => {
  const response = await axiosInstance.post<ResponseToken>(
    "/auth/login",
    credentials
  );
  return response.data;
};

export const logoutUser = () => {
  sessionStorage.removeItem("token");
};
