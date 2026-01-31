import React from "react";
import { useDispatch } from "react-redux";
import {logout as LOGOUT} from "../../services/auth.services.js"
import { logout } from "../../store/authSlice";
import { useNavigate } from "react-router-dom";
function LogoutBtn(){
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const logoutHandler = async () => {
       try {
        await LOGOUT()
        dispatch(logout());
       } catch (error) {
            navigate('/');
       }
    }
    return(
        <button
        className="inline-bock px-6 py-2 duration-200 hover:bg-blue-100 rounded-full"
        onClick={logoutHandler}
        >Logout</button>
    )
}

export default LogoutBtn