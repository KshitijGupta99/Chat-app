/** @type {import('tailwindcss').Config} */
import daisyui from "daisyui";

export default {
  mode: "jit",
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",   // Removed the space issue
    "./components/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      backgroundColor: {
        'custom-blue': '#3b82f6',  // This is Tailwind's `bg-blue-500`
      },
    },
  },
  plugins: [daisyui],
};
