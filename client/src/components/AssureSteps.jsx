// AssureSteps.jsx
import React from "react";

const steps = [
  {
    title: "Quality assurance",
    desc1: "Lorem ipsum dolor sit amet consectetur.",
    desc2: "Id eget condimentum elementum",
    image: "./assets/assure1.png", // Add image URL here
  },
  {
    title: "Delivery from 2–4 hour",
    desc1: "Lorem ipsum dolor sit amet consectetur.",
    desc2: "Id eget condimentum elementum",
    image: "./assets/assure2.png", // Add image URL here
  },
  {
    title: "Pay after receiving products",
    desc1: "Lorem ipsum dolor sit amet consectetur.",
    desc2: "Id eget condimentum elementum",
    image: "./assets/assure3.png", // Add image URL here
  },
];

const AssureSteps = () => {
  return (
    <section className=" py-6 md:py-12 px-4 md:px-16 lg:px-24">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 items-center relative">
        {steps.map((step, index) => (
          <div key={index} className="text-center relative">
            <img
              src={step.image}
              alt={step.title}
              className="w-32 h-32 object-contain mx-auto "
            />
            <h3 className="font-semibold text-md mb-2">{step.title}</h3>
            <p className="text-sm text-gray-600">{step.desc1}</p>
            <p className="text-sm text-gray-600">{step.desc2}</p>

            {/* Dashed Arrow */}
            {index !== steps.length - 1 && (
              <div className="hidden sm:block absolute right-[-20px] top-[50%] translate-y-[-50%]">
                <svg
                  width="60"
                  height="30"
                  viewBox="0 0 60 30"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M0 15 C20 0, 40 30, 60 15"
                    stroke="#ccc"
                    strokeWidth="2"
                    strokeDasharray="5,5"
                    fill="transparent"
                  />
                </svg>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default AssureSteps;
