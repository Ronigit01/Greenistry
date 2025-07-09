import React, { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";


const faqs = [
  {
    question: "What Is Your Policy On Refunds?",
    answer:
      "We want you to be completely satisfied with your order. If there’s an issue with your delivery—such as missing items, damaged goods, or incorrect products—please contact our support team within 24 hours of delivery.We’ll review your request and, if eligible, offer a refund to your original payment method or provide store credit.",
  },
  {
    question: "How Much Do Deliveries Cost?",
    answer:
      "Delivery cost depends on your location and selected items. You'll see exact pricing during checkout.",
  },
  {
    question: "What Are Your Delivery Hours?",
    answer:
      "We deliver from 9:00 AM to 9:00 PM every day, including weekends and holidays.",
  },
  {
    question: "What About The Prices?",
    answer:
      "Our prices are competitive and reflect the quality of our service and products.",
  },
  {
    question: "Do You Serve My Area?",
    answer:
      "We currently serve most metro cities. Enter your ZIP code during checkout to confirm.",
  },
];

export default function FAQSection() {
  const [activeIndex, setActiveIndex] = useState(0);

  const toggleFAQ = (index) => {
    setActiveIndex(index === activeIndex ? null : index);
  };

  return (
    <section className="max-w-full md:px-4 mx-auto w-full py-12 md:py-0 md:pb-12">
      <h2 className="text-xl font-medium md:text-2xl text-center mb-4 md:mb-8">
        Common Questions
      </h2>
      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div key={index} className="border-b">
            <button
              onClick={() => toggleFAQ(index)}
              className="w-full text-left py-4 flex justify-between items-center"
            >
              <span
                className={`font-semibold text-base ${
                  index === activeIndex ? "text-green-600" : "text-gray-900"
                }`}
              >
                Q. {faq.question}
              </span>
              <span className="text-sm h-1">
                {index === activeIndex ? <FaChevronUp /> : <FaChevronDown />}
              </span>
            </button>
            {index === activeIndex && (
              <p className="text-gray-700 pb-4 pl-1 pr-4">{faq.answer}</p>
            )}
          </div>
        ))}
      </div>

      {/* Contact Box */}
      <div className="mt-10 bg-[#FFFCF5] px-6 py-6 rounded-lg flex flex-col sm:flex-row justify-between items-center">
        <div className="mb-4 sm:mb-0">
          <h3 className="text-lg font-semibold mb-1">Still Have Questions?</h3>
          <p className="text-sm text-gray-600">
            Can’t find the answer you’re looking for? Please chat to our
            friendly team.
          </p>
        </div>
        <a
          href="mailto:contact@example.com"
          className="mt-2 sm:mt-0 bg-green-600 text-white px-5 py-2 rounded-md hover:bg-green-700"
        >
          Get in Touch
        </a>
      </div>
    </section>
  );
}
