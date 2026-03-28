/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: {
          50: '#fcfcf9',
          100: '#fffffd',
        },
        teal: {
          300: '#32b8c6',
          400: '#2da6b2',
          500: '#21808d',
          600: '#1d7480',
          700: '#1a6873',
          800: '#2996a1',
        },
        slate: {
          500: '#626c71',
          900: '#13343b',
        },
        charcoal: {
          700: '#1f2121',
          800: '#262828',
        },
        brick: {
          500: '#c0152f', // error
        },
        amber: {
          500: '#a84b2f', // warning
        }
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui'],
        manrope: ['Manrope', 'sans-serif'],
      },
      borderRadius: {
        'lg': '12px',
        'base': '8px',
      }
    },
  },
  plugins: [],
}
