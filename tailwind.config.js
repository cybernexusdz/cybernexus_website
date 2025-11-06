/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      // 👧 Girl Light
      {
        girlLight: {
          primary: "#E776F7", // main accent
          secondary: "#713D87", // secondary accent
          accent: "#FDF2FF", // soft background accent
          neutral: "#000000", // headings / contrast
          "base-100": "#FDF2FF", // background
          "base-content": "#000000", // default text
          info: "#E776F7", // extra accent if needed
        },
      },
      // 👧 Girl Dark
      {
        girlDark: {
          primary: "#E776F7", // main accent
          secondary: "#713D87", // secondary
          accent: "#1A031E", // dark surface
          neutral: "#713D87", // UI border/neutral
          "base-100": "#1A031E", // background
          "base-content": "#FFFFFF", // text
          info: "#E776F7",
        },
      },
      // 👦 Boy Light
      {
        boyLight: {
          primary: "#3BE0FE", // main accent
          secondary: "#173C69", // secondary tone
          accent: "#EBFCFF", // background accent
          neutral: "#042340", // text contrast
          "base-100": "#EBFCFF", // main background
          "base-content": "#042340", // main text
          info: "#3BE0FE",
        },
      },
      // 👦 Boy Dark
      {
        boyDark: {
          primary: "#3BE0FE", // bright accent
          secondary: "#173C69", // deep secondary
          accent: "#051B2E", // dark background
          neutral: "#042340", // darker tone
          "base-100": "#051B2E", // background
          "base-content": "#FFFFFF", // text
          info: "#3BE0FE",
        },
      },
    ],
  },
};
