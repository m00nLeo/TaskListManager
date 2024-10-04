/** @type {import('tailwindcss').Config} */

import withMT from "@material-tailwind/html/utils/withMT";

module.exports = withMT({
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      // Add custom keyframes for the gradient animation
      keyframes: {
        "border-gradient": {
          "0%": { borderColor: "rgba(255, 0, 150, 1)" },
          "25%": { borderColor: "rgba(0, 204, 255, 1)" },
          "50%": { borderColor: "rgba(0, 255, 204, 1)" },
          "75%": { borderColor: "rgba(204, 255, 0, 1)" },
          "100%": { borderColor: "rgba(255, 0, 150, 1)" },
        },
      },
      // Add the animation class for the gradient border
      animation: {
        "gradient-border": "border-gradient 3s linear infinite",
      },
    },
  },
  plugins: [],
});
