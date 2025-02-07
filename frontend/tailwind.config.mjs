/** @type {import('tailwindcss').Config} */
const { keyframes } = require('tailwindcss/defaultTheme');

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      keyframes: {
        spooky: {
          '0%': { transform: 'translateY(0.15em) scaleY(0.95)' },
          '100%': { transform: 'translateY(-0.15em)' },
        },
      },
      animation: {
        spooky: 'spooky 2s alternate infinite linear',
      },
    },
  },
  plugins: [],
};
