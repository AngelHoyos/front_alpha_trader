export interface UserData {
  fullName: string;
  profilePicture: string;
}
export interface ResponseToken {
  status?: boolean;
  token?: string;
  message?: string;
  data?: UserData;
}
