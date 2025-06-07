/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#fdf2f8',
          100: '#fce7f3',
          200: '#fbcfe8',
          300: '#f9a8d4',
          400: '#f472b6',
          500: '#ec4899',
          600: '#db2777',
          700: '#be185d',
          800: '#9d174d',
          900: '#831843',
          950: '#500724',
        },
        secondary: {
          50: '#f5f7fa',
          100: '#ebeef5',
          200: '#dfe4ee',
          300: '#cbd4e1',
          400: '#a4b4cd',
          500: '#8096b9',
          600: '#677da6',
          700: '#576990',
          800: '#495878',
          900: '#404a63',
          950: '#262a3a',
        },
        accent: {
          50: '#fff9ed',
          100: '#fff3d6',
          200: '#ffe3ad',
          300: '#ffcf75',
          400: '#ffb13d',
          500: '#ff9517',
          600: '#f97b0d',
          700: '#cc5a0c',
          800: '#a34512',
          900: '#853a13',
          950: '#481c06',
        },
      },
      boxShadow: {
        'card': '0 2px 4px rgba(0, 0, 0, 0.04), 0 5px 15px rgba(0, 0, 0, 0.08)',
        'card-hover': '0 10px 15px rgba(0, 0, 0, 0.1), 0 4px 6px rgba(0, 0, 0, 0.05)',
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-in-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
};