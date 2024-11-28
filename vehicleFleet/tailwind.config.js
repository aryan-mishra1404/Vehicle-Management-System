/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        inter: ["Inter", "sans-serif"],
      },
      backgroundColor: {
        primary: "#fff",
        secondary: "#F9FAFB",
        themeColor: "#1570EF",
      },
      colors: {
        primaryColor: "#101828",
        secondaryColor: "#667085",
        themeColor: "#175CD3",
        tertiaryColor: "#344054",
      },
      borderColor: {
        default: "#E4E7EC",
      },
      fontSize: {
        sm: ".9vmax",
        base: "1vmax",
        xl: "1.1vmax",
        "3xl": "1.7vmax",
        "4xl": "2.2vmax",
      },
      fontWeight: {
        // medium: "50",
      },
      padding: {
        2: ".5vmax",
        3: ".75vmax",
        4: ".9vmax",
        5: "1.25vmax",
        6: "1.5vmax",
        9: "2.25vmax",
        10: "2.5vmax",
        14: "3.75vmax",
      },
      margin: {
        6: "1.5vmax",
      },
    },
  },
  plugins: [],
};

// text-sm: text-[.9vmax]
//text-3xl: text-[1.7vmax]
//text-xl: text-[1.1vmax]
