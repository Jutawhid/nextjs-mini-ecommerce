/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        theme_blue: {
          light: "#232F3E",
          DEFAULT: "#131921",
        },
        blue: {
          light: "#e6ad0f",
          dark: "#b68500",
        },
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require("@tailwindcss/line-clamp"), require('@tailwindcss/aspect-ratio')],
}
