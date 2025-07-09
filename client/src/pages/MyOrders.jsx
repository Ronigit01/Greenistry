import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import axiosInstance from "../utils/axiosInstance";

function MyOrders() {
  const [myOrders, setMyOrders] = useState([]);

  const fetchOrder = async () => {
    try {
      const { data } = await axiosInstance.get("/api/order/user");
      if (data.success) {
        setMyOrders(data.orders);
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to fetch orders");
    }
  };

  useEffect(() => {
    fetchOrder();
  }, []);

  return (
    <div className="mt-8 pb-12">
      <h1 className="text-lg font-semibold md:text-2xl mb-6">My Orders</h1>

      {myOrders.length === 0 ? (
        <p className="text-gray-500 text-sm">
          You haven’t placed any orders yet.
        </p>
      ) : (
        myOrders.map((order, index) => (
          <div
            key={index}
            className="my-4 border border-gray-200 rounded-md p-3 md:p-5 max-w-6xl mx-auto shadow-sm"
          >
            {/* Order Summary Header */}
            <div className="flex flex-wrap justify-between text-xs md:text-sm text-gray-700 mb-3">
              <span>Order ID: {order._id}</span>
              <span>Payment: {order.paymentType}</span>
              <span>Total: ${order.amount}</span>
            </div>

            {/* Each Item in Order */}
            {order.items.map((item, idx) => (
              <div
                key={idx}
                className={`flex items-center justify-between gap-3  ${
                  idx !== order.items.length - 1 && "border-b"
                } border-gray-100`}
              >
                {/* Product Image + Info */}
                <div className="flex items-center gap-3 w-full">
                  <div className="w-14 h-14 shrink-0">
                    <img
                      src={`https://greenistry-2.onrender.com/images/${item.product.image[0]}`}
                      alt={item.product.name}
                      className="w-full h-full object-cover rounded"
                    />
                  </div>
                  <div className="flex flex-col justify-between text-xs md:text-sm w-full overflow-hidden">
                    <span className="font-medium truncate">
                      {item.product.name}
                    </span>
                    <span className="text-gray-500 text-[11px]">
                      {item.product.category}
                    </span>
                    <div className="flex gap-4 mt-1 text-[11px] text-gray-600">
                      <p>Qty: {item.quantity}</p>
                      <p>Status: {order.status || "Pending"}</p>
                    </div>
                  </div>
                </div>

                {/* Amount */}
                <div className="text-sm font-semibold text-gray-800 whitespace-nowrap pl-2">
                  ${item.product.offerPrice * item.quantity}
                </div>
              </div>
            ))}

            {/* Date */}
            <div className="text-right text-xs text-gray-500 mt-2">
              {new Date(order.createdAt).toLocaleDateString()}
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default MyOrders;
