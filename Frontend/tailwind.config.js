/** @type {import('tailwindcss').Config} */
export default {
    content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
      extend: {
        colors: {
          'primary': "#FFCE1A",
          'secondary': "#0D0842",
          'blackBG': "#F3F3F3",
          'accent': "#FF5841", // Renamed 'Favorite' to 'accent' for better clarity
        },
        fontFamily:{
            'primary':["Montserrat","serif"],
            'secondary':["Nunito","serif"]
        }
      },
    },
    plugins: [],
  };