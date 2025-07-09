import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import {assets} from "../assets/assets"
import { useNavigate } from "react-router-dom";
import { setUser } from "../slice/AuthSlice";
import { setShowUserLogin } from "../slice/AuthSlice";
import {setFilterProducts} from "../slice/ProductSlice"
import axiosInstance from "../utils/axiosInstance";
import toast from "react-hot-toast";

function Navbar() {
    
    const [open, setOpen] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [search,setSearch] = useState()
    const {user , showUserLogin} = useSelector((state)=>state.auth)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {totalitems} = useSelector((state)=>state.cart)


    const handelSubmit = (e) => {
      e.preventDefault();
      dispatch(setFilterProducts(search))
      navigate("/products")
    }

    useEffect(() => {
      if (user && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    }, [user]);
    
    
    const logoutHandeler = async() =>{
      try{

        const { data } = await axiosInstance.get("/api/user/logout", {
          withCredentials: true,
        });

        if(data.success){
          dispatch(setUser(null))
      
          localStorage.removeItem("user")
          setIsMobileMenuOpen(false);
          navigate("/")
          toast.success(data.message)
        }else{
          console.log(data.message)
          toast.error(data.message)
        }

      }catch(err){
        console.log(err)
        toast.error(err.message);
      }
    }



    return (
      <>
        {/* Top Main Nav */}
        <nav className="w-full px-4 md:px-16 lg:px-24 xl:px-32 py-3 border-b bg-white z-50">
          <div className="flex items-center justify-between gap-4">
            {/* Logo */}
            <Link to="/">
              {/* Desktop Logo */}
              <img
                src="./assets/logo1.png"
                alt="Desktop Logo"
                className="hidden sm:block w-28"
              />

              {/* Mobile Logo */}
              <img
                src="./assets/logo-mobile.png"
                alt="Mobile Logo"
                className="block sm:hidden w-10"
              />
            </Link>

            {/* Search */}
            <form
              onSubmit={handelSubmit}
              className="flex items-center border rounded-full px-3 py-1.5 w-full max-w-[15.5rem] sm:max-w-md bg-white shadow-sm"
            >
              <img
                src={assets.menu_icon}
                alt="menu"
                className="w-2 md:w-4 h-4 opacity-60"
              />
              <input
                type="text"
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search for product..."
                className="flex-1 px-3 py-1 outline-none text-sm"
              />
              <button type="submit" className="bg-green-600 p-2 rounded-full">
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 14 14"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M10.836 10.615L15 14.695"
                    stroke="#fff"
                    strokeWidth="1.5"
                  />
                  <circle cx="6" cy="6" r="4" stroke="#fff" strokeWidth="1.5" />
                </svg>
              </button>
            </form>

            {/* Right Icons */}
            <div className="hidden sm:flex items-center gap-5">
              {/* Profile */}
              {user ? (
                <div className="relative group">
                  <img
                    onClick={() => setOpen(!open)}
                    src={assets.profile_icon}
                    alt="Profile"
                    className="w-7 cursor-pointer"
                  />
                  {open && (
                    <ul className="absolute right-0 top-10 bg-white shadow-md border rounded-md w-32 text-sm z-50">
                      <li
                        onClick={() => {
                          navigate("/my-orders");
                          setOpen(false);
                        }}
                        className="p-2 cursor-pointer hover:bg-gray-100"
                      >
                        My Orders
                      </li>
                      <li
                        onClick={logoutHandeler}
                        className="p-2 cursor-pointer hover:bg-gray-100"
                      >
                        Logout
                      </li>
                    </ul>
                  )}
                </div>
              ) : (
                <button
                  onClick={() =>{
                    dispatch(setShowUserLogin(true))
                  } }
                  className="text-sm bg-green-500 hover:bg-green-600 text-white px-4 py-1.5 rounded-full"
                >
                  Login
                </button>
              )}

              {/* Cart */}
              <div
                onClick={() => navigate("/cart")}
                className="relative cursor-pointer"
              >
                <img src={assets.cart_icon} alt="Cart" className="w-6" />
                <span className="absolute -top-1 -right-2 text-[10px] text-white bg-green-500 w-[18px] h-[18px] flex items-center justify-center rounded-full">
                  {totalitems}
                </span>
              </div>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="sm:hidden"
            >
              <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
                <path
                  d="M4 6h16M4 12h16M4 18h16"
                  stroke="#444"
                  strokeWidth="2"
                />
              </svg>
            </button>
          </div>
        </nav>

        {/* Bottom Link Bar - Desktop */}
        <div className="hidden sm:flex justify-between items-center px-4 md:px-16 lg:px-24 xl:px-32 py-2 text-sm text-gray-600">
          <div className="flex gap-6">
            <Link to="/">Home</Link>
            <Link to="/about">About</Link>
            <Link to="/products">All Products</Link>
          </div>
          <p className="hidden md:block text-xs">
            Need help?{" "}
            <a
              href="mailto:contact@example.com"
              className="text-green-600 underline"
            >
              roniyouknow@gmail.com
            </a>
          </p>
        </div>

        {/* Mobile Menu Dropdown */}
        {isMobileMenuOpen && (
          <div className="sm:hidden px-4 py-3 bg-white border-t text-sm text-gray-700 flex flex-col gap-3">
            <Link to="/" onClick={() => setIsMobileMenuOpen(false)}>
              Home
            </Link>
            <Link to="/about" onClick={() => setIsMobileMenuOpen(false)}>
              About
            </Link>
            <Link to="/products" onClick={() => setIsMobileMenuOpen(false)}>
              All Products
            </Link>

            {/* Cart */}
            <div
              onClick={() => {
                navigate("/cart");
                setIsMobileMenuOpen(false);
              }}
              className="relative flex items-center gap-2 cursor-pointer w-fit"
            >
              <img src={assets.cart_icon} alt="Cart" className="w-5 h-5" />

              {totalitems > 0 && (
                <span className="absolute -top-1 -right-2 text-[8px] text-white bg-green-500 w-[14px] h-[14px] flex items-center justify-center rounded-full">
                  {totalitems}
                </span>
              )}
            </div>

            {user ? (
              <>
                <Link
                  to="/my-orders"
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    navigate("/my-orders");
                  }}
                >
                  My Orders
                </Link>
                <button
                  onClick={logoutHandeler}
                  className="text-left text-red-500"
                >
                  Logout
                </button>
              </>
            ) : (
              <button
                onClick={() => dispatch(setShowUserLogin(true))}
                className="text-xs bg-green-500 hover:bg-green-600 text-white px-8 py-2 rounded-full w-fit"
              >
                Login
              </button>
            )}
          </div>
        )}
      </>
    );
}

export default Navbar