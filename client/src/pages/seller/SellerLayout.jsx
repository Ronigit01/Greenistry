import React, { useState } from "react";
import { setIsSeller } from "../../slice/AuthSlice";
import { useDispatch, useSelector } from "react-redux";
import { assets } from "../../assets/assets";
import { NavLink, Outlet, useNavigate } from "react-router-dom";

function SellerLayout() {
  const { isSeller } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [sidebarOpen, setSidebarOpen] = useState(false);

  const sidebarLinks = [
    { name: "Dashboard", path: "/seller", icon: assets.add_icon },
    {
      name: "Product List",
      path: "/seller/product-list",
      icon: assets.product_list_icon,
    },
    { name: "Orders", path: "/seller/orders", icon: assets.order_icon },
  ];

  const handleLogout = () => {
    dispatch(setIsSeller(false));
    navigate("/");
  };

  return (
    <>
      {/* Top Navigation */}
      <div className="flex items-center justify-between md:px-8 border-b border-gray-300 py-3 bg-white transition-all duration-300">
        <div className="flex items-center gap-4">
          {/* Hamburger for mobile */}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="md:hidden block text-2xl focus:outline-none"
          >
            ☰
          </button>

          {/* Logos */}
          <a href="/">
            {/* Mobile Logo */}
            <img
              className="h-8 block md:hidden"
              src="./assets/logo-mobile.png" // <-- set this path in your assets
              alt="Mobile Logo"
            />
            {/* Desktop Logo */}
            <img
              className="h-10 hidden md:block"
              src="./assets/logo1.png" // <-- set this path in your assets
              alt="Desktop Logo"
            />
          </a>
        </div>

        {/* Admin Info */}
        <div className="flex items-center gap-4 text-sm text-gray-700">
          <p className="block text-sm font-medium">Hi! Admin</p>
          <button
            onClick={handleLogout}
            className="border border-gray-400 rounded-full px-3 py-1 hover:bg-gray-100"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Sidebar & Content */}
      <div className="flex">
        {/* Sidebar */}
        <div
          className={`${
            sidebarOpen ? "block" : "hidden"
          } md:block absolute md:relative z-50 bg-white md:w-64 w-48 h-screen border-r border-gray-300 pt-4 transition-all duration-300`}
        >
          {sidebarLinks.map((item) => (
            <NavLink
              to={item.path}
              key={item.name}
              end={item.path === "/seller"}
              className={({ isActive }) => `flex items-center py-3 px-4 gap-3 
                ${
                  isActive
                    ? "border-r-4 md:border-r-[6px] bg-indigo-500/10 border-indigo-500 text-indigo-500"
                    : "hover:bg-gray-100/90 border-white text-gray-700"
                }`}
              onClick={() => setSidebarOpen(false)}
            >
              <img src={item.icon} alt={item.name} className="w-6 h-6" />
              <p className="md:block hidden">{item.name}</p>
            </NavLink>
          ))}
        </div>

        {/* Main Page Content */}
        <div className="flex-1  md:p-8 overflow-auto">
          <Outlet />
        </div>
      </div>
    </>
  );
}

export default SellerLayout;
