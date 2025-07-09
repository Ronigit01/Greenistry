import React from 'react'
import { useNavigate } from 'react-router-dom'


import { categories } from '../assets/assets';

const Category = () => {

  const navigate = useNavigate()
    return (
      <section className="my-10">
        <p className="text-xl font-medium md:text-2xl mb-8">
          Popular Categories
        </p>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {categories.map((cat, index) => (
            <div
              onClick={() => {
                navigate(`/products/${cat.path.toLowerCase()}`);
                scrollTo(0, 0);
              }}
              key={index}
              className={`${cat.bg} ${
                index === 0 ? "md:row-span-2 md:col-span-1" : ""
              } flex items-center justify-center text-center rounded-lg min-h-[140px] md:min-h-[220px] overflow-hidden`}
            >
              {/* If imageFull is true (only for first box) */}
              {cat.imageFull ? (
                <div className="w-full h-full flex items-end">
                  <img
                    src={cat.image}
                    alt={cat.title}
                    className="w-full h-full object-contain object-bottom transition-transform duration-200 hover:scale-105"
                  />
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center p-2 transition-transform duration-200 hover:scale-105">
                  <img
                    src={cat.image}
                    alt={cat.title}
                    className="w-[7rem] object-contain mb-2 "
                  />
                  <h3 className="text-sm md:text-base font-medium mb-1">
                    {cat.title}
                  </h3>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>
    );
  };
  

export default Category;