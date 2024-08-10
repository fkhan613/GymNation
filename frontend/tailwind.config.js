import withMT from "@material-tailwind/react/utils/withMT";
import forms from "@tailwindcss/forms";

/** @type {import('tailwindcss').Config} */
export default withMT({
  content: ["./src/**/*.{html,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [forms],
});
