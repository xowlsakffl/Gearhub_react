/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        notosans: ["Noto Sans KR", "sans-serif"],
      },
      boxShadow: {
        custom: "0 0 15px rgba(0, 0, 0, 0.3)",
        right: "10px 0px 10px -5px rgba(0, 0, 0, 0.3)",
      },
      colors: {
        customBlue: "rgba(28, 100, 242, 1)",
        banner: {
          color1: "#D4B5A1",
          color2: "#A38DBD",
          color3: "#8FA6A0",
          color4: "#C9C9FF",
        },
      },
      backgroundImage: {
        "custom-gradient": "linear-gradient(to right, #111827, #1f2937)",
        "button-gradient": "linear-gradient(to right, #7e22ce, #ef4444)",
        "custom-gradient2": "linear-gradient(135deg, #f5f5f5, #eae7dc)",
      },
    },
  },
  plugins: [],
};
