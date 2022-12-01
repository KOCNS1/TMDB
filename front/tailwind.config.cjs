/** @type {import('tailwindcss').Config} */
module.exports = {
  important: true,
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      screens: {
        xsm: "495px",
      },
    },
  },
  plugins: [require("@tailwindcss/forms"), require("daisyui")],
};
