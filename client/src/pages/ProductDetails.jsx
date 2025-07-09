import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { assets } from "../assets/assets";
import { addToCart, updateCart } from "../slice/CartSlice";
import { useDispatch } from "react-redux";
import { fetchProducts } from "../slice/ProductSlice";

function ProductDetails() {
  const { products } = useSelector((state) => state.products);
  const { cartItems } = useSelector((state) => state.cart);
  let { id } = useParams();
  console.log(cartItems);
  const product = products.find((item) => item._id === id);
  // console.log(product)
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [thumbnail, setThumbnail] = useState();

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  useEffect(() => {
    // setThumbnail(product?.image[0]? `http://localhost:3000/images/${product.image[0]}`:null)
    if (product?.image?.[0]) {
      setThumbnail(`https://greenistry-2.onrender.com/images/${product.image[0]}`);
    }
  }, [product]);

  if (!product) {
    return (
      <div className="text-red-600 text-center py-10">
        Product not found or still loading.
      </div>
    );
  }

  return (
    <div>
      <div
        onClick={scrollTo(0, 0)}
        className="max-w-6xl w-full px-0 md:px-6 mt-10"
      >
        <p>
          <Link to="/">Home</Link> /<Link to="/products"> Products</Link> /
          <Link to={`/products/${product.category.toLowerCase()}`}>
            {" "}
            {product.category}
          </Link>{" "}
          /<span className="text-indigo-500"> {product.name}</span>
        </p>

        <div className="flex flex-col md:flex-row gap-16 mt-4">
          <div className="flex gap-3">
            <div className="flex flex-col gap-3">
              {product.image.map((img, index) => (
                <div
                  key={index}
                  onClick={() =>
                    setThumbnail(
                      `https://greenistry-2.onrender.com/images/${img}`
                    )
                  }
                  className="border max-w-24 border-gray-500/30 rounded overflow-hidden cursor-pointer"
                >
                  <img
                    src={`https://greenistry-2.onrender.com/images/${img}`}
                    alt={`Thumbnail ${index + 1}`}
                  />
                </div>
              ))}
            </div>

            <div className="border border-gray-500/30 max-w-100 rounded overflow-hidden">
              <img src={thumbnail} alt="Selected product" />
            </div>
          </div>

          <div className="text-sm w-full md:w-1/2">
            <h1 className="text-3xl font-medium">{product.name}</h1>

            <div className="flex items-center gap-0.5 mt-1">
              {Array(5)
                .fill("")
                .map((_, i) => (
                  <img
                    key={i}
                    src={i < 4 ? assets.star_icon : assets.star_dull_icon}
                    alt="rating"
                    className="w-3 md:w-3.5"
                  />
                ))}
              <p className="text-base ml-2">({product.rating})</p>
            </div>

            <div className="mt-6">
              <p className="text-gray-500/70 line-through">
                MRP: ${product.price}
              </p>
              <p className="text-2xl font-medium">MRP: ${product.offerPrice}</p>
              <span className="text-gray-500/70">(inclusive of all taxes)</span>
            </div>

            <p className="text-base font-medium mt-6">About Product</p>
            <ul className="list-disc ml-4 text-gray-500/70">
              {product.description}
            </ul>

            <div className="flex items-center mt-10 gap-4 text-base">
              <button
                onClick={async () => {
                  const success = await dispatch(updateCart(cartItems));
                  if (!success) return;
                  dispatch(addToCart(product));
                }}
                className="w-full py-3.5 cursor-pointer font-medium bg-gray-100 text-gray-800/80 hover:bg-gray-200 transition"
              >
                Add to Cart
              </button>

              <button
                onClick={async () => {
                  const success = await dispatch(updateCart(cartItems));
                  if (!success) return;
                  dispatch(addToCart(product));
                  navigate("/cart");
                  scrollTo(0, 0);
                }}
                className="w-full py-3.5 cursor-pointer font-medium bg-green-500 text-white hover:bg-green-600 transition"
              >
                Buy now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;
