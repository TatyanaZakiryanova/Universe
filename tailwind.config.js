/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/app/**/*.{html,js,jsx,ts,tsx,css}'],
  theme: {
    extend: {
      colors: {
        customBackground: 'rgb(44, 44, 44)',
        customButton: 'rgb(104, 65, 151)',
        customButtonHover: 'rgb(83, 44, 128)',
      },
    },
  },
  plugins: [],
};
