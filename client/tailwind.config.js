/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx,ts,tsx}"],
  theme: {
    extend: {},
    screens: {
      sm: { min: "340px", max: "450px" },
      md: { min: "451px" },
    },
  },
  plugins: [],
};
