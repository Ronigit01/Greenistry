import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";
import { addToCart, updateCart, updateCartQuentity } from "../slice/CartSlice";
import { useDispatch, useSelector } from "react-redux";

function ProductCard({ product }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => state.cart|| {});
  const cartItem = cartItems.find((item) => item._id === product._id);
   console.log(cartItems)

    


  return (
    <div>
      {product && (
        <div
          onClick={() =>
            navigate(
              `/product/${product.category.toLowerCase()}/${product._id}`
            )
          }
          className="border border-gray-200 rounded-xl p-2 md:p-4 bg-white hover:shadow-md transition-all flex flex-col md:justify-between h-[220px] sm:h-auto md:h-auto xl:h-auto"
        >
          {/* Image Container */}
          <div className="w-full h-26 md:h-36 flex items-center justify-center overflow-hidden bg-gray-50 rounded-md mb-3">
            <img
              src={`https://greenistry-2.onrender.com/images/${product.image[0]}`}
              alt={product.name}
              className="max-w-[8rem] md:max-w-36 object-contain transition-transform duration-200 hover:scale-105"
            />
          </div>

          {/* Text Content */}
          <div className="flex flex-col mb-1 md:mb-0 justify-between sm:h-full">
            <div>
              <p className="text-[10px] md:text-sm text-gray-400 capitalize">
                {product.category}
              </p>
              <p className=" text-[14px] md:text-lg font-semibold text-gray-800 truncate">
                {product.name}
              </p>
              <div className="flex items-center gap-1 mt-1">
                {Array(5)
                  .fill("")
                  .map((_, i) => (
                    <img
                      key={i}
                      src={i < 4 ? assets.star_icon : assets.star_dull_icon}
                      alt="rating"
                      className=" w-2 h-2 md:w-3.5 md:h-3.5"
                    />
                  ))}
              </div>
            </div>

            {/* Price + Add to Cart */}
            <div className="flex justify-between gap-3 items-end mt-0 md:mt-3">
              <div>
                <p className="text-indigo-600 font-semibold text-[14px] md:text-lg min-[400px]:text-base">
                  ${product.offerPrice}
                  <span className="text-gray-400 text-[12px] md:text-sm line-through ml-1 md:ml-2 min-[400px]:text-xs">
                    ${product.price}
                  </span>
                </p>
              </div>

              <div onClick={(e) => e.stopPropagation()}>
                {!cartItem ? (
                  <button
                    onClick={async () => {
                      const success = await dispatch(updateCart(cartItems));
                      if (!success) return;
                      dispatch(addToCart(product));
                    }}
                    className="flex items-center gap-1 px-3 py-1.5 bg-indigo-100 border border-indigo-300 rounded-md text-sm font-medium text-indigo-600 hover:bg-indigo-200 max-[394px]:text-xs max-[394px]:px-2 max-[394px]:py-1"
                  >
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 14 14"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M.583.583h2.333l1.564 7.81a1.17 1.17 0 0 0 1.166.94h5.67a1.17 1.17 0 0 0 1.167-.94l.933-4.893H3.5m2.333 8.75a.583.583 0 1 1-1.167 0 .583.583 0 0 1 1.167 0m6.417 0a.583.583 0 1 1-1.167 0 .583.583 0 0 1 1.167 0"
                        stroke="#615fff"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    Add
                  </button>
                ) : (
                  <div className="flex items-center gap-1 px-3 py-1.5 bg-indigo-100 border border-indigo-300 rounded-md text-sm font-medium text-indigo-600 hover:bg-indigo-200 max-[394px]:text-xs max-[394px]:px-1 max-[394px]:py-1">
                    <button
                      onClick={async () => {
                        const success = await dispatch(updateCart(cartItems));
                        if (!success) return;
                        dispatch(
                          updateCartQuentity({
                            id: product._id,
                            quantity: cartItem.qnty - 1,
                          })
                        );
                      }}
                      className="cursor-pointer h-full"
                    >
                      -
                    </button>
                    <span className="min-w-[20px] text-center font-medium text-indigo-700">
                      {cartItem.qnty}
                    </span>
                    <button
                      onClick={async () => {
                        const success = await dispatch(updateCart(cartItems));
                        if (!success) return;
                        dispatch(
                          updateCartQuentity({
                            id: product._id,
                            quantity: cartItem.qnty + 1,
                          })
                        );
                      }}
                      className="text-indigo-700"
                    >
                      +
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProductCard;
