import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchProducts, setSearchProducts } from "../slice/ProductSlice";
import ProductCard from "../components/ProductCard";
function Products() {
  const { products, searchProducts } = useSelector((state) => state.products);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [activeCategory, setActiveCategory] = useState("All");

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  useEffect(() => {
    console.log(searchProducts.length);

    if (searchProducts.length === 0) {
      dispatch(setSearchProducts(products));
      console.log(searchProducts.length);
    }
  }, [dispatch, products]);

  let setcategory = (category) => {
    let filter = products.filter((product) => {
      return product.category === category;
    });

    dispatch(setSearchProducts(filter));
  };

  return (
    <div className="mt-8 md:mt-16 ">
      <h1 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6 text-gray-800">
        All Products
      </h1>

      <div className="mb-6 md:mb-8">
        <h2 className="text-lg md:text-xl font-semibold text-gray-700 mb-3">
          Categories
        </h2>
        <div className="flex flex-wrap gap-2 sm:gap-3">
          {[
            "All",
            "Vegetables",
            "Dairy",
            "Fruits",
            "Drinks",
            "Instant",
            "Bakery",
            "Grains",
          ].map((category) => (
            <button
              key={category}
              onClick={() => {
                if (category === "All") {
                  setActiveCategory("All");
                  dispatch(setSearchProducts(products));
                } else {
                  setcategory(category);
                  setActiveCategory(category);
                }
              }}
              className={`px-3 py-1.5 md:px-4 md:py-2 rounded-full text-xs md:text-sm transition whitespace-nowrap ${
                activeCategory === category
                  ? "bg-blue-100 hover:bg-blue-200 text-blue-800"
                  : "bg-gray-100 hover:bg-gray-200 text-gray-700"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-6 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 gap-3 mb-16 md:gap-6">
        {searchProducts
          .filter((product) => product.inStock)
          .map((product, index) => {
            return (
              <>
                <ProductCard key={index} product={product} />
              </>
            );
          })}
      </div>
    </div>
  );
}

export default Products;
