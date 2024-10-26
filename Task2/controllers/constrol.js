import { User } from "../models/model.js";

export const createUser =async (req,res) =>{
     try{
        const  name = "urvi";
        const email = "urvi@gmail.com";
        const password = "urvi123";
        const newUser = new User({name,email,password});
        res.send("user created");
        
     }catch (error) {
        console.error(error)
     }
}