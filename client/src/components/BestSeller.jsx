import React from 'react'
import { useSelector } from 'react-redux';
import ProductCard from './ProductCard';

function BestSeller() {

    const {products} = useSelector((state)=>state.products)

  return (
    <div className="mt-6">
      <p className="text-xl font-medium md:text-2xl ">Best Seller</p>
      <div className="mt-6 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 gap-3 md:gap-6">
        {products
          .filter((products) => products.inStock)
          .slice(0, 5)
          .map((product, index) => {
            return <ProductCard key={index} product={product} />;
          })}
      </div>
    </div>
  );
}

export default BestSeller