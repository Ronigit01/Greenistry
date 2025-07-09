import React, { useEffect, useRef } from "react";

function Banner() {
  const scrollRef = useRef(null);

  useEffect(() => {
    const container = scrollRef.current;
    let scrollAmount = 0;

    const interval = setInterval(() => {
      if (!container || window.innerWidth >= 768) return;

      scrollAmount += container.clientWidth * 0.9;
      if (scrollAmount >= container.scrollWidth) {
        scrollAmount = 0;
      }

      container.scrollTo({
        left: scrollAmount,
        behavior: "smooth",
      });
    }, 1500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      ref={scrollRef}
      className="overflow-x-auto md:overflow-visible mt-10 md:mt-16 scroll-smooth [&::-webkit-scrollbar]:hidden"
    >
      <div className="flex items-center gap-4 md:gap-6 px-4 md:px-0 w-fit md:w-full max-w-[1440px] mx-auto">
        <img
          src="./assets/banner1.png"
          alt="Banner 1"
          className="w-[18rem] sm:w-[22rem] md:w-[26rem] [1024px]:w-[24rem] lg:w-[34rem] xl:w-[38rem] 2xl:w-[38rem] flex-shrink-0 rounded-md"
        />
        <img
          src="./assets/banner2.png"
          alt="Banner 2"
          className="w-[18rem] sm:w-[22rem] md:w-[26rem] [1024px]:w-[24rem] lg:w-[34rem] xl:w-[38rem] 2xl:w-[38rem] flex-shrink-0 rounded-md"
        />
      </div>
    </div>
  );
}

export default Banner;
