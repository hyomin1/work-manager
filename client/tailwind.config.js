/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme');
module.exports = {
  content: ['./src/**/*.{html,js,jsx,ts,tsx}'],
  theme: {
    extend: {
      backgroundImage: {
        'custom-gradient':
          'radial-gradient(ellipse at 50% 50%, hsl(210, 100%, 97%), hsl(0, 0%, 100%))',
      },
      boxShadow: {
        'custom-shadow':
          'hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px',
      },
      fontFamily: {
        sans: ['Pretendard', ...defaultTheme.fontFamily.sans],
      },
    },
    screens: {
      sm: { min: '340px', max: '540px' },
      md: { min: '541px' },
    },
  },
  plugins: [],
  variants: {
    extend: {
      display: ['print'], // 인쇄 버튼 누를 때 display: none; 하기 위함
    },
  },
};
