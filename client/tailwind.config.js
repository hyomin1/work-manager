/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx,ts,tsx}"],
  theme: {
    extend: {},
    screens: {
      sm: { min: "340px", max: "540px" },
      md: { min: "541px" },
    },
  },
  plugins: [],
  variants: {
    extend: {
      display: ["print"], // 인쇄 버튼 누를 때 display: none; 하기 위함
    },
  },
};
