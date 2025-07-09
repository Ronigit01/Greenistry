import React from 'react'
import { assets } from '../assets/assets'
import { Link } from 'react-router-dom'


function Hero() {
  return (
    <div className="relative z-0">
      <img
        src="./assets/heroimage.png"
        alt=""
        className="hidden md:block w-full h-[26rem] object-cover"
      />
      <img
        src="./assets/heroimage1.png"
        alt=""
        className=" md:hidden w-full"
      />

      <div className=" md:pl-10 absolute inset-0 flex flex-col items-center md:items-start justify-end md:justify-center pb-14 md:pb-0 md:pl-18 lg:pl-24">
        <h1 className=" md:pl-10 text-2xl md:text-[32px] font-inter  font-bold text-[#1B1B1B] text-center md:text-left max-w-auto md:min-w-40 leading-tight lg:leading-[2.5rem]">
          We Delivered <br /> to your Doorstep
        </h1>
        <div className=" md:pl-10 flex items-cernter mt-6 font-medium text-[14px] gap-6">
          <Link
            to="/products"
            className="flex group items-center gap-2
                px-5  rounded text-white py-2 bg-green-600 cursor-pointer"
          >
            Shop Now
            <img
              src={assets.white_arrow_icon}
              alt=""
              className="md:hidden transition group-focus:translate-x-1"
            />
          </Link>
          <Link
            to="/products"
            className="hidden md:flex group items-center gap-2
                px-5  rounded text-white py-2 bg-green-600 cursor-pointer"
          >
            Explore Deals
            <img
              src={assets.white_arrow_icon}
              alt=""
              className="md:hidden transition group-focus:translate-x-1"
            />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Hero