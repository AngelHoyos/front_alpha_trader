import { JSX } from "react";
import { useAuth } from "../hooks/useAuth";
import { Navigate } from "react-router-dom";

export const PrivateRoute = ({children}:{children:JSX.Element}) => {
    const {token} = useAuth();
    return token? children: <Navigate to='/login' replace/>
}
