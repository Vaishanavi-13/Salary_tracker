/** @type {import('tailwindcss').Config} */
export default {
   darkMode: 'class', // enable manual toggling
   content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        msrtc: {
          red: '#C8102E',   // primary transport red
          blue: '#003366',  // deep navy blue
          gold: '#FFD700',  // accent gold
          light: '#F5F5F5', // light background
        },
      },
      fontFamily: {
        sans: ['Poppins', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

