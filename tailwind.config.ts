import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      keyframes: {
        overlayShow: {
          "0%": {
            opacity: "0",
            transform: "translateY(200px)"
          },
          "100%": {
            opacity: "1",
            transform: "translateY(0)"
          }
        },
        contentShow: {
          "0%": {
            opacity: "0",
            transform: "translate(-50%, -10%) scale(0.70)",
          },
          "100%": {
            opacity: "1",
            transform: "translate(-50%, -50%) scale(1)",
          },
        }
      },
      animation: {
        overlayShow: "overlayShow 300ms cubic-bezier(0.16, 1, 0.3, 1)",
        contentShow: "contentShow 300ms cubic-bezier(0.16, 1, 0.3, 1)",
      },
      colors: {
        primary: '#DBF72C',
        secondary: '#0C0F17',
        green: "#32ba7c",
      },
      boxShadow: {
        primary: '0px 2px 4px rgba(255, 255, 255, 0.15)'
      }
    },
  },
  plugins: [],
};
export default config;
