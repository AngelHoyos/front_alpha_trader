import { DataUserLogin } from "./../models/DataUserLogin.model";
import { useState } from "react";

export const useAuthLogin = () => {
  const [userDataLogin, setUserDataLogin] = useState<DataUserLogin>({
    correo_electronico: "",
    contraseña: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserDataLogin((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    
    console.log("hollll");
  }; 
   return {userDataLogin, handleChange, handleSubmit};
};

