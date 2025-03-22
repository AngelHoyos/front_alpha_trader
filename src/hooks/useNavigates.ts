import { useNavigate } from "react-router";


export const useNavigates = () => {
  const navigate=useNavigate();
  const goTo=(path:string)=>{
    navigate(path.toLowerCase());
  }
  const goToLogin=()=>goTo("/login");
  
  const goToRegister=()=>goTo("/");

  const goToDashboard=()=>goTo("/dashboard");

  return {goTo, goToRegister,goToLogin,goToDashboard};
}
