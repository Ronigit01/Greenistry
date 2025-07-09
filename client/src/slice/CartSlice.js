import { createSlice } from "@reduxjs/toolkit";
import {toast} from "react-hot-toast"
import axiosInstance from "../utils/axiosInstance";
import { useEffect } from "react";


const initialState = {
  cartItems: [],
  totalitems: 0,
  totalAmount: 0,
};

export const updateCart =(cartItems) => async(dispatch)=>{

  console.log("Sending cartItems to backend:", cartItems); //
  try{
    const { data } = await axiosInstance.post("/api/cart/update", {
      cartItems,
      withCredentials: true,
    });

    if (!data.success) {
      toast.error(data.message);
      return false;
    }else{
      return true
    }
  }catch(err){
    toast.error(err.message);
    return false;
  }
}


const cartSlice = createSlice({
  name: "cartItems",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const itemIndex = state.cartItems.findIndex(
        (item) => item._id === action.payload
      );

      if (itemIndex >= 0) {
        state.cartItems[itemIndex].qnty += 1;
      } else {
        const temp = { ...action.payload, qnty: 1 };
        state.cartItems = [...state.cartItems, temp];
      }
      state.totalitems = state.cartItems.reduce((a, b) => a + b.qnty, 0);
      state.totalAmount = state.cartItems.reduce(
        (a, b) => a + b.offerPrice * b.qnty,
        0
      );
      toast.success("added to cart");
    },

    removeItem: (state, action) => {
      state.cartItems = state.cartItems.filter((item) => item._id !== action.payload);
      toast.success("removed from cart");
      state.totalitems = state.cartItems.reduce((a, b) => a + b.qnty, 0);
      state.totalAmount = state.cartItems.reduce(
        (a, b) => a + b.offerPrice * b.qnty,
        0
      );
    },

    // cartCounts: (state,action) => {
    //    state.totalitems = state.carts.reduce((a,b)=>a+b.qnty,0)
    // },

    updateCartQuentity: (state, action) => {
      const { id, quantity } = action.payload;

      let item = state.cartItems.find((item) => item._id === id);

      if (item) {
        item.qnty = quantity;
      }
    
      state.totalitems = state.cartItems.reduce((a, b) => a + b.qnty, 0);
      state.totalAmount = state.cartItems.reduce(
        (a, b) => a + b.offerPrice * b.qnty,
        0
      );
    },

    // totalCartAmont: (state,action) => {
    //     state.totalAmount = state.carts.reduce((a,b)=> a+b.price * b.qnty,0)
    // }

   
  },
});



export const {addToCart,removeItem, updateCartQuentity,cartCounts, totalCartAmont} = cartSlice.actions

export default cartSlice.reducer
