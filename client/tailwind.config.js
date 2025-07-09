import path from "path"; // Required for resolving aliases

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#4b0082",
      },
    },
  },
  plugins: [],
};
