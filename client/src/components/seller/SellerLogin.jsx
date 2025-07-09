import React, { useEffect, useState } from 'react'
import { setIsSeller } from '../../slice/AuthSlice'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import axiosInstance from "../../utils/axiosInstance";
import toast from 'react-hot-toast';

function SellerLogin() {

     const [email, setEmail] = useState("");
      const [password, setPassword] = useState("");

    const {isSeller} = useSelector((state)=>state.auth);
    const navigate = useNavigate();
    const dispatch = useDispatch()

    const handleSubmit = async (e) => {

      try{
        e.preventDefault();
        const {data} = await axiosInstance.post("/api/seller/login",{email,password})

        if(data.success){

          dispatch(setIsSeller(true));
          navigate("/seller")
          toast.success(data.message)
        }else{
          toast.error(data.message);
       
        }

      }catch(err){
        toast.error(err.message);
        console.log(err.message);
      }
    };

    useEffect(()=>{
        if(isSeller){
            navigate("/seller")
        }
    },[isSeller])

  return (

    !isSeller && (

    <div onClick={()=>dispatch(setShowUserLogin(false))} className="fixed top-0 left-0 bottom-0 right-0 z-30 flex items-center justify-center bg-black/50 text-gray-600">
    
        <form
         onSubmit={handleSubmit}
         onClick={(e)=>e.stopPropagation()} className="flex flex-col gap-4 m-auto items-start p-8 py-12 w-80 sm:w-[352px] rounded-lg shadow-xl border border-gray-200 bg-white">
          <p className="text-2xl font-medium m-auto">
            <span className="text-green-500">Seller Login</span>{" "}
          
          </p>
          
          <div className="w-full ">
            <p>Email</p>
            <input
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              placeholder="type here"
              className="border border-gray-200 rounded w-full p-2 mt-1 outline-green-500"
              type="email"
              required
            />
          </div>
          <div className="w-full ">
            <p>Password</p>
            <input
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              placeholder="type here"
              className="border border-gray-200 rounded w-full p-2 mt-1 outline-green-500"
              type="password"
              required
            />
          </div>
          
          <button className="bg-green-500 hover:bg-green-600 transition-all text-white w-full py-2 rounded-md cursor-pointer">
          Login
          </button>
        </form>
        </div>
    )
  )
}

export default SellerLogin