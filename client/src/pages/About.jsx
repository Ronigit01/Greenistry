import React from "react";
import { FaLeaf, FaCartPlus, FaWallet, FaStar } from "react-icons/fa";
import CTA from "../components/CTA";
import NewsLetter from "../components/NewsLetter";
import { Link } from "react-router-dom";
import { assets } from "../assets/assets";

export default function About() {
  return (
    <div className="font-sans text-gray-800">
      {/* Hero Section (as you like it) */}
      <section className="bg-white py-8 md:py-16">
        <div className="max-w-7xl mx-auto  grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-green-700 mb-6 leading-snug">
              Delivering Fresh Groceries to Your Doorstep
            </h1>
            <p className="text-md text-gray-600 mb-6">
              Experience the freshest produce, sourced directly from local farms
              and delivered right to you. We make grocery shopping simpler and
              better.
            </p>

            <Link
              to="/products"
              className=" items-center gap-2
                px-4 rounded text-white py-2 bg-green-600 cursor-pointer"
            >
              Shop Now
            </Link>
          </div>
          <img
            src="https://images.unsplash.com/photo-1600891964599-f61ba0e24092"
            alt="Fresh Groceries"
            className="rounded-xl shadow-lg w-full object-cover h-80"
          />
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-gray-50 py-14">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-green-700 mb-12">
            What Makes Us Special
          </h2>
          <div className="grid md:grid-cols-4 gap-8">
            {[
              {
                icon: <FaLeaf className="text-green-600 text-3xl mb-3" />,
                title: "Farm Fresh",
                desc: "We work directly with local farms for the freshest ingredients.",
              },
              {
                icon: <FaCartPlus className="text-green-600 text-3xl mb-3" />,
                title: "Quick Delivery",
                desc: "Get your groceries delivered in under 2 hours.",
              },
              {
                icon: <FaWallet className="text-green-600 text-3xl mb-3" />,
                title: "Fair Pricing",
                desc: "Enjoy premium products without overpaying.",
              },
              {
                icon: <FaStar className="text-green-600 text-3xl mb-3" />,
                title: "Rated 5 Stars",
                desc: "Trusted by thousands of happy customers.",
              },
            ].map((feature, i) => (
              <div
                key={i}
                className="bg-white p-6 rounded-lg shadow hover:shadow-md transition text-center"
              >
                {feature.icon}
                <h4 className="text-lg font-semibold text-green-800 mb-2">
                  {feature.title}
                </h4>
                <p className="text-sm text-gray-600">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-white pt-20">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-green-700 mb-10">
            What Our Customers Say
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                name: "Emily R.",
                review:
                  "Absolutely love the convenience! The produce is always fresh, and delivery is fast.",
              },
              {
                name: "Michael T.",
                review:
                  "A reliable service I can count on every week. Great prices, too!",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="bg-gray-50 p-6 rounded-lg shadow text-left"
              >
                <p className="text-gray-700 italic mb-4">"{item.review}"</p>
                <div className="font-semibold text-green-700">{item.name}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <NewsLetter />
    </div>
  );
}
