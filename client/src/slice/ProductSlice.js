
import { createSlice } from "@reduxjs/toolkit";
import { dummyProducts } from "../assets/assets";
import axiosInstance from "../utils/axiosInstance";



const initialState = {
    products :[],
    categoryfilter: [],
    searchProducts: [],
}

 export const fetchProducts =  () =>async(dispatch) => {
    try {
  
      const {data} = await axiosInstance.get("/api/product/list")
      if(data.success){
        dispatch(setProducts(data.allproducts));

      }else{
        console.log(data.message)
      }
      
    } catch (err) {
      console.log(err)
    }
  }

const ProductSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setProducts: (state, action) => {
      state.products = action.payload;
    },

    setSearchProducts: (state, action) => {
      state.searchProducts = action.payload;
    },
    setFilterProducts: (state, action) => {
      state.searchProducts = state.products.filter((product) => {
        return product.name.toLowerCase().includes(action.payload);
      });
    },

    setCategoryFilter: (state, action) => {
      const category = action.payload;

      state.categoryfilter = state.products.filter((product)=> product.category.toLowerCase() === category)
    },
  },
});


export const {setProducts, setSearchProducts, setFilterProducts, setCategoryFilter} = ProductSlice.actions

export default ProductSlice.reducer