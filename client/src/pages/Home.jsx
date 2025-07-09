import React, { useEffect } from "react";
import Hero from "../components/Hero";
import Category from "../components/Category";
import BestSeller from "../components/BestSeller";
import Newsletter from "../components/NewsLetter";
import PopularProducts from "../components/PopularProducts";
import Footer from "../components/Footer";
import AssureSteps from "../components/AssureSteps";
import Banner from "../components/Banner";
import CTA from "../components/CTA";
import FAQSection from "../components/Faq";
import { fetchProducts, setProducts } from "../slice/ProductSlice";
import { useDispatch } from "react-redux";
import axiosInstance from "../utils/axiosInstance";

function Home() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <div className="mt-4 md:mt-0 px-6 md:px-0  ">
      <Hero />
      <div className="md:px-16 lg:px-24 xl:px-32">
        <AssureSteps />
        <Category />
        <BestSeller />
        <Banner />
        <PopularProducts />
        <Newsletter />
        <FAQSection />
      </div>
    </div>
  );
}

export default Home;
