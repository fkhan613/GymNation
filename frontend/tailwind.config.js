const withMT = require("@material-tailwind/react/utils/withMT");

/** @type {import('tailwindcss').Config} */
export default withMT({
  content: ["./src/**/*.{html,jsx, tsx}"],
  theme: {
    extend: {},
  },
  plugins: [],
});
