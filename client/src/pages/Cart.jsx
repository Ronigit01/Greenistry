import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { dummyAddress } from "../assets/assets";
import { removeItem, updateCart, updateCartQuentity } from "../slice/CartSlice";
import axiosInstance from "../utils/axiosInstance";
import toast from "react-hot-toast";

function Cart() {
  const [showAddress, setShowAddress] = useState(false);
  const [address, setAddress] = useState([]);
  const [seletedAddress, setSeletedAddress] = useState(null);
  const { totalAmount } = useSelector((state) => state.cart);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [paymentOption, setPaymentOption] = useState("COD");
  const { cartItems, totalitems } = useSelector((state) => state.cart);
  console.log(cartItems);

  useEffect(() => {
    dispatch(updateCart());
  }, [cartItems]);

  const getAddress = async () => {
    try {
      const { data } = await axiosInstance.get("/api/address/get");

      if (data.success) {
        console.log(data.addresses);
        setAddress(data.addresses);
        if (data.addresses.length > 0) {
          setSeletedAddress(data.addresses[0]);
        }
      } else {
        console.log(data.message);
        toast.error(data.message);
      }
    } catch (err) {
      toast.error(err.message);
    }
  };

  useEffect(() => {
    getAddress();
  }, []);

  const placeOrder = async () => {
    try {
      if (!seletedAddress) {
        return toast.error("please select an address");
      }

      if (paymentOption === "COD") {
        const { data } = await axiosInstance.post("/api/order/place", {
          items: cartItems.map((item) => ({
            product: item._id,
            quantity: item.qnty,
          })),
          address: seletedAddress._id,
        });

        if (data.success) {
          toast.success(data.message);
          navigate("/my-orders");
        }
      } else {
        const { data } = await axiosInstance.post("/api/order/stripe", {
          items: cartItems.map((item) => ({
            product: item._id,
            quantity: item.qnty,
          })),
          address: seletedAddress._id,
        });

        if (data.success) {
          window.location.replace(data.url);
        }
      }
    } catch (err) {
      console.log(err);
      toast.error(err.message);
    }
  };

  return (
    <>
      {cartItems.length !== 0 ? (
        <div className="flex flex-col md:flex-row py-8 md:py-16 max-w-6xl w-full px-0 md:px-6 mx-auto">
          <div className="flex-1 max-w-4xl">
            <h1 className="text-xl md:text-3xl font-medium mb-2 md:mb-6">
              Shopping Cart{" "}
              <span className="text-sm text-indigo-500">
                {totalitems} items
              </span>
            </h1>

            <div className="grid grid-cols-[2fr_1fr_1fr] text-gray-500 text-sm md:text-base font-medium pb-3">
              <p className="text-left">Product Details</p>
              <p className="text-center">Subtotal</p>
              <p className="text-center">Action</p>
            </div>

            {cartItems.map((product, index) => (
              <div
                key={index}
                className="grid grid-cols-[2fr_1fr_1fr] text-gray-500 items-center text-sm md:text-base font-medium pt-3"
              >
                <div className="flex items-center md:gap-6 gap-3">
                  <div
                    onClick={() => {
                      navigate(`/product/${product.category}/${product._id}`);
                    }}
                    className="cursor-pointer w-24 h-24 flex items-center justify-center border border-gray-300 rounded"
                  >
                    <img
                      className="max-w-full h-full object-cover"
                      src={`https://greenistry-2.onrender.com/images/${product.image[0]}`}
                      alt={product.name}
                    />
                  </div>
                  <div>
                    <p className="hidden md:block font-semibold">
                      {product.name}
                    </p>
                    <div className="font-normal text-gray-500/70">
                      <div className="flex items-center">
                        <p>Qty:</p>
                        <select
                          onChange={(e) =>
                            dispatch(
                              updateCartQuentity({
                                id: product._id,
                                quantity: Number(e.target.value),
                              })
                            )
                          }
                          value={product.qnty}
                          className="outline-none"
                        >
                          {Array(product.qnty > 9 ? product.qnty : 9)
                            .fill("")
                            .map((_, index) => (
                              <option key={index} value={index + 1}>
                                {index + 1}
                              </option>
                            ))}
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
                <p className="text-center">
                  ${product.offerPrice * product.qnty}
                </p>
                <button
                  onClick={() => dispatch(removeItem(product._id))}
                  className="cursor-pointer mx-auto"
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="m12.5 7.5-5 5m0-5 5 5m5.833-2.5a8.333 8.333 0 1 1-16.667 0 8.333 8.333 0 0 1 16.667 0"
                      stroke="#FF532E"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </div>
            ))}

            <button
              onClick={() => {
                navigate("/products");
                scrollTo(0, 0);
              }}
              className="group cursor-pointer flex items-center mt-8 gap-2 text-green-500 font-medium"
            >
              <svg
                width="15"
                height="11"
                viewBox="0 0 15 11"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M14.09 5.5H1M6.143 10 1 5.5 6.143 1"
                  stroke="#48bb78"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              Continue Shopping
            </button>
          </div>

          <div className="max-w-[360px] w-full bg-gray-100/40 p-5 max-md:mt-16 border border-gray-300/70">
            <h2 className="text-xl md:text-xl font-medium">Order Summary</h2>
            <hr className="border-gray-300 my-5" />

            <div className="mb-6">
              <p className="text-sm font-medium uppercase">Delivery Address</p>
              <div className="relative fles justify-between items-start mt-2">
                <p className="text-gray-500">
                  {seletedAddress
                    ? `${seletedAddress.street}, ${seletedAddress.city},${seletedAddress.state},
                    ${seletedAddress.country}`
                    : "No Adress Found"}
                </p>
                <button
                  onClick={() => setShowAddress(!showAddress)}
                  className="text-green-600 hover:underline cursor-pointer"
                >
                  Change
                </button>
                {showAddress && (
                  <div className="absolute top-12 py-1 bg-white border bordre-gray-300 test-sm w-full">
                    {address.map((address, index) => {
                      return (
                        <p
                          key={index}
                          onClick={() => {
                            setSeletedAddress(address);
                            setShowAddress(false);
                          }}
                          className="text-gray-500 p-2 hover:bg-gray-100"
                        >
                          {address.street},{address.city},{address.state},
                          {address.country},
                        </p>
                      );
                    })}
                    <p
                      className="text-green-500 text-center bg-gray-500/5 cursor-pointer p-2 hover:bg-green-500/10"
                      onClick={() => navigate("/add-address")}
                    >
                      Add Address
                    </p>
                  </div>
                )}
              </div>

              <p className="text-sm font-medium uppercase mt-6">
                Payment Method
              </p>

              <select
                onChange={(e) => setPaymentOption(e.target.value)}
                className="w-full border border-gray-300 bg-white px-3 py-2 mt-2 outline-none"
              >
                <option value="COD">Cash On Delivery</option>
                <option value="Online">Online Payment</option>
              </select>
            </div>

            <hr className="border-gray-300" />

            <div className="text-gray-500 mt-4 space-y-2">
              <p className="flex justify-between">
                <span>Price</span>
                <span>${totalAmount}</span>
              </p>
              <p className="flex justify-between">
                <span>Shipping Fee</span>
                <span className="text-green-600">Free</span>
              </p>
              <p className="flex justify-between">
                <span>Tax (2%)</span>
                <span>${(totalAmount * 2) / 100}</span>
              </p>
              <p className="flex justify-between text-lg font-medium mt-3">
                <span>Total Amount:</span>
                <span>${totalAmount + (totalAmount * 2) / 100}</span>
              </p>
            </div>

            <button
              onClick={placeOrder}
              className="w-full py-3 mt-6 cursor-pointer bg-green-500 text-white font-medium hover:bg-green-600 transition"
            >
              {paymentOption === "COD" ? "Place Order" : "Pay Now"}
            </button>
          </div>
        </div>
      ) : (
        <>
          <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4 py-16">
            {/* Image */}
            <img
              src="https://img.freepik.com/free-vector/empty-shopping-basket-concept-illustration_114360-29795.jpg"
              alt="Empty Cart"
              className="w-48 sm:w-60 md:w-72 mb-6 rounded-xl shadow-sm"
            />

            {/* Heading */}
            <h2 className="text-xl sm:text-2xl font-semibold text-gray-700 mb-2">
              Your cart is empty
            </h2>

            {/* Subtext */}
            <p className="text-gray-500 text-sm sm:text-base mb-6 max-w-sm">
              Looks like you haven’t added anything to your cart yet. Browse our
              products and start shopping!
            </p>

            {/* CTA Button */}
            <Link
              to="/"
              className="bg-green-500 hover:bg-green-600 text-white text-sm sm:text-base px-6 py-2 rounded-md transition-all"
            >
              Continue Shopping
            </Link>
          </div>
        </>
      )}
    </>
  );
}

export default Cart;
