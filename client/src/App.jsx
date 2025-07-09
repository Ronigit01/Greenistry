import { useEffect, useRef, useState } from 'react'
import { BrowserRouter, Route,Routes } from 'react-router-dom'
import Home from "./pages/Home"
import Products from "./pages/Products"
import ProductDetails from "./pages/ProductDetails"
import Cart from "./pages/Cart"
import Navbar from './components/Navbar'
import { useLocation } from 'react-router-dom'
import About from './pages/About'
import MyOrders from './pages/MyOrders'
import { useDispatch, useSelector } from 'react-redux'
import Auth from './models/Auth'
import "./index.css"
import ProductCategory from './pages/ProductCategory'
import { setProducts } from './slice/ProductSlice'
import { dummyProducts } from './assets/assets'
import Footer from './components/Footer'
import { Toaster } from 'react-hot-toast'
import Address from './pages/Address'
import SellerLayout from './pages/seller/SellerLayout'
import SellerLogin from './components/seller/SellerLogin'
import AddProduct from './pages/seller/AddProduct'
import ProductList from './pages/seller/ProductList'
import Orders from './pages/seller/Orders'
import { setUser } from './slice/AuthSlice'



function App() {
  
  const isSellerPath = useLocation().pathname.includes("seller")
  const { showUserLogin, isSeller } = useSelector((state) => state.auth);
  const dispatch = useDispatch()
  

  // useEffect(()=>{
  //   dispatch(setProducts(dummyProducts))
  // },[])
  
 useEffect(()=>{
  const user = localStorage.getItem("user")
  if(user){
    dispatch(setUser(JSON.parse(user)))
  }
 },[]) 

  return (
    <div className="text-default min-h-screen">
      {isSellerPath ? "" : <Navbar />}
      {showUserLogin ? <Auth /> : null}
      <Toaster />
      <Routes>
        <Route>
          <Route path="/" element={<Home />} />
        </Route>
      </Routes> 
      <div className="px-6 md:px-16 lg:px-24 xl:px-32">
        <Routes>
          <Route path="/about" element={<About />} />
          <Route path="/products" element={<Products />} />
          <Route path="/product/:category/:id" element={<ProductDetails />} />
          <Route path="/products/:category" element={<ProductCategory />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/my-orders" element={<MyOrders />} />
          <Route path="/add-address" element={<Address />} />

          <Route path="/seller" element={isSeller?<SellerLayout/>:<SellerLogin/>}>
           
            <Route index element={isSeller? <AddProduct/> : null}/>
            <Route path="add-product" element={isSeller? <AddProduct/> : null}/>
            <Route path="product-list" element={isSeller? <ProductList/> : null}/>
            <Route path="orders" element={isSeller? <Orders/> : null}/>

          </Route>


        </Routes>
      </div>
      {isSellerPath ? "" : <Footer />}
    </div>
  );
}

export default App
