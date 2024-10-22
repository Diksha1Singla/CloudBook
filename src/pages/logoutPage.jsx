import { Navigate } from "react-router-dom";
import { useEffect } from "react";
import { useAuth } from "../store/auth_store";
export const Logout = () =>{
    const {LogoutUser} = useAuth()

    useEffect(()=>{
        LogoutUser()
    },[LogoutUser]);
    return <Navigate to="/login"/>
}


/*
1.path in app.jsx
2.logout page
3.
*/