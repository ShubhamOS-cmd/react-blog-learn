import axios from "axios";
import conf from "../conf/config";
const signup = async (data) => {
    const {email , password , name} = data;
    if ([email, password, name].some(field => !field || field.trim() === "")) {
    throw new Error("All fields are required");
    }
    const userData = {
    email,
    password,
    name: name.toLowerCase(),
    };
    const response = await axios.post(`${conf.baseurl}/user/signup`,userData);

    return response;
}
const login = async (data) => {
    const {email , password} = data;
    if (!email?.trim() || !password?.trim()){
        throw new Error("All fields are required");
    }
    const login_data = {
        email,
        password,
    }
    const response = await axios.post(`${conf.baseurl}/user/login` , login_data , { withCredentials: true });
    return response.data.data.user;
    // what is { withCredentials: true } it tells browser that includes the cookie in the request and accepts the cookie in that response

}
const logout = async() => {
    await axios.post(`${conf.baseurl}/user/logout` , {} , {withCredentials:true});

}
const getCurrentUser = async() => {
    const user = await axios.get(`${conf.baseurl}/user/current-User` ,  {withCredentials:true});
    return user.data.data;
} // axios .get only accepts 2 arguments

const refreshUser = async() => {
    const res = axios.post(`${conf.baseurl}/user/refresh-user` , {} , {withCredentials:true})
    return res;
}
export{
    signup,
    login,
    logout,
    refreshUser,
    getCurrentUser
}