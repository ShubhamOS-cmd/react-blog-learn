// it is a mechanism to protect routes or pages 

import React , {useEffect , useState} from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function Protected({children , authentication = true}){ // user send authentication , if not send then we by default true
    const navigate = useNavigate();
    const[loader , setloader] = useState(true)
    const authStatus = useSelector(state => state.auth.status)

    useEffect(() => {



        if(authentication && authStatus !== authentication){
            navigate("/login")
        }
        else if(!authentication && authStatus !== authentication){
            navigate("/")
        }
        setloader(false)
    } , [authStatus , navigate , authentication]) // authStatus , navigate , authentication if any change then this useEffect re execute

    return loader ? <hi>loading.....</hi> : <>{children}</>
}
