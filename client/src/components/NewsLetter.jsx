import React from "react";

function NewsLetter() {
  return (
    <div className="mt-8 md:mt-0 md:py-16">
      <div className="py-16 md:py-20 px-4 sm:px-8 flex flex-col items-center bg-green-50 justify-center text-center rounded-md space-y-3">
        {/* Heading */}
        <h1 className="text-lg sm:text-2xl md:text-4xl font-semibold">
          Never Miss a Deal!
        </h1>

        {/* Subtext */}
        <p className="text-sm sm:text-base md:text-lg text-gray-500/70 pb-4 px-2">
          Subscribe to get the latest offers, new arrivals, and exclusive
          discounts
        </p>

        {/* Form */}
        <form className="flex flex-row items-center justify-between w-full max-w-lg gap-2">
          <input
            type="email"
            placeholder="Enter your email id"
            required
            className="border border-gray-300 rounded-md h-10 sm:h-12 px-3 text-sm w-full text-gray-600 outline-none"
          />
          <button
            type="submit"
            className="h-10 sm:h-12 px-4 sm:px-6 text-sm text-white bg-green-500 hover:bg-green-600 transition-all rounded-md"
          >
            Subscribe
          </button>
        </form>
      </div>
    </div>
  );
}

export default NewsLetter;
