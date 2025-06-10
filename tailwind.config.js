// tailwind.config.js
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx,mdx}", 
    "./components/**/*.{js,ts,jsx,tsx,mdx}", 
  ],
  theme: {
    extend: {
      fontFamily: {
        clash: ['Clash Display', 'sans-serif'],
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}
