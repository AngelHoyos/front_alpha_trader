import { useNavigate } from "react-router-dom";

export const useNavigates = () => {
  const navigate = useNavigate();

  const goTo = (path: string) => {
    navigate(path);
  };
  
  const goToLogin = () => goTo("/login");

  const goToRegister = () => goTo("/");

  const goToDashboard = () => goTo("/dashboard");

  return { goTo, goToRegister, goToLogin, goToDashboard };
};
