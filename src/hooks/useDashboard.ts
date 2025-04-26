import { useEffect, useState } from "react";
import { useAuth } from "./useAuth";
import axiosInstance from "../api/axiosInstance/axiosInstance";
import { ProfileResponse } from "../models/Profile.model";

export const useDashboard = () => {
  const token = useAuth();
  const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null);

  useEffect(() => {
    const validateExistence = async () => {
      if (!token) {
        setIsAuthorized(false);
        return;
      }
      try {
        const response = await axiosInstance.get<ProfileResponse>(
          "/preferencesProfile/Profile",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const profile = response.data;
        if (profile.data.status) {
          setIsAuthorized(true);
        } else {
          setIsAuthorized(false);
        }
      } catch (error) {
        console.error("Error al validar acceso al dashboard:", error);
        setIsAuthorized(false);
      }
    };

    validateExistence();
  }, [token]);
  return { isAuthorized };
};
