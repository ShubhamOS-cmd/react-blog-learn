import conf from "../conf/config.js";
import { Client , Account , ID } from "appwrite";


export class AuthService{ // Complete OOP's
    client = new Client();
    account;


    constructor(){
        this.client
            .setEndpoint(conf.appwrite_Url)
            .setProject(conf.appwrite_projectId);
            this.account = new Account(this.client)
    }
    async createAccount({email , password , name}){
        try {

          const userAccount =   await this.account.create({
            userId: ID.unique(),
            email: email,
            password: password,
            name: name,
          });
          if(userAccount){
           // call Another method we want that if user account created then let him log in
            return this.login({email , password});
          }
          else{
            return userAccount;
          }
        } catch (error) {
            throw error;
        }
    }
    async login({email ,password}){
        try {
           return  await this.account.createEmailPasswordSession({
            email: email,
            password: password,
           });
        } catch (error) {
            throw error;
        }
    }
    async getCurrentUser(){
        try {
           return await this.account.get();
        } catch (error) {
            console.log("Appwrite service :: getCurrentUser :: error " , error);
        }
        return null;
    }
    async logout(){
        try {
            await this.account.deleteSessions(); // clear all sessions from every browsers
        } catch (error) {
            console.log("Appwrite service :: logout :: error " , error);
        }
    }
}

const authService = new AuthService(); // we make object 

export default authService; // we pass this object 
// and every methods which is made inside this file is access by this object "authService"
// in future if we changed our backend service then only this file will be changed 
// in case if you feel difficulty then take this as object and client and account as class member and all methods as a member function
