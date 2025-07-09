import {configureStore} from "@reduxjs/toolkit"
import AuthReducer from "../slice/AuthSlice"
import ProductReducer from "../slice/ProductSlice"
import CartReducer from "../slice/CartSlice"

export const store = configureStore({
    reducer:{
        auth: AuthReducer,
        products: ProductReducer,
        cart: CartReducer,
    }
})