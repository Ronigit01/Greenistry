import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { setCategoryFilter } from "../slice/ProductSlice";
import { useDispatch, useSelector } from "react-redux";
import ProductCard from "../components/ProductCard";

function ProductCategory() {
  const { category } = useParams();
  const dispatch = useDispatch();

  const { categoryfilter, products } = useSelector((state) => state.products);
  useEffect(() => {
    dispatch(setCategoryFilter(category));
  }, [category, products]);

  return (
    <div>
      <section className="min-h-auto text-black px-4 py-12">
        <div className="max-w-7xl mx-auto">
          {/* Heading */}
          <div className="text-start mb-10">
            <h1 className="text-2xl md:text-3xl font-bold capitalize">
              {category} Products
            </h1>
            <p className="text-gray-400 mt-2">
              Showing all in-stock items in the{" "}
              <span className="text-purple-400">{category}</span> category
            </p>
          </div>

          {/* Product Grid */}
          {categoryfilter.length === 0 ? (
            <div className="text-center text-gray-300 text-lg">
              No products in stock for this category.
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4  sm:gap-6">
              {categoryfilter.map((product) => (
                <ProductCard
                  key={product._id || product.id}
                  product={product}
                />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

export default ProductCategory;
