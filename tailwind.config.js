/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/app/**/*.{html,js,jsx,ts,tsx,css}'],
  theme: {
    extend: {
      colors: {
        customBackground: 'rgb(44, 44, 44)',
        customBackground2: 'rgb(59, 59, 59)',
        customButton: 'rgb(104, 65, 151)',
        customButtonHover: 'rgb(83, 44, 128)',
        customTextColor: 'rgb(224, 224, 224)',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: 0, transform: 'translateY(20px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
      },
      animation: {
        fadeIn: 'fadeIn 0.4s ease-out forwards',
      },
    },
  },
  plugins: [],
};
