import { configureStore } from "@reduxjs/toolkit";
import Userslice from "../Feature/Userslice";
//import userReducer from "../Feature/Userslice"
export const store=configureStore({
    reducer:{
        //user:userReducer,
        user:Userslice
    }
})