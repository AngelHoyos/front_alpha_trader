import { useLocation } from "react-router-dom";

export const useQueryParams = () => {
  const { search } = useLocation();
  const params = new URLSearchParams(search);

  return {
    token: params.get("token") || "",
    expiresAt: params.get("expiresAt") || "",
    email: params.get("email") || "",
  };
};
