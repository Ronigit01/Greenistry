
import { createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../utils/axiosInstance";
import toast from "react-hot-toast";

const initialState = {
    user : false,
    isSeller: false,
    showUserLogin: false,
}


export const fetchuser = () => async (dispatch) =>{

    try{
        const {data} = await axiosInstance.get("/api/user/is-auth")

        if(!data.success){
            return false;
            toast.error(data.message)
        }else{
            return true;
           
        }

    }catch(err){
        toast.error(err.message)
        return false;
    }
}


const AuthSlice = createSlice({
    name: "auth",
    initialState,
    reducers : {
        setUser : (state,action) => {
            state.user = action.payload
        },

        setIsSeller: (state,action) => {
            state.isSeller = action.payload
        },

        setShowUserLogin: (state,action)=>{
            state.showUserLogin = action.payload
        }
    }
})



export const {setUser,setIsSeller, setShowUserLogin} = AuthSlice.actions

export default AuthSlice.reducer
