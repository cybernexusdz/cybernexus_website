import daisyui from "daisyui";
import tailwindAnimate from "tailwindcss-animate";
/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },
      colors: {
        border: "rgb(var(--border) / <alpha-value>)",
        input: "rgb(var(--input) / <alpha-value>)",
        ring: "rgb(var(--ring) / <alpha-value>)",
        background: "rgb(var(--background) / <alpha-value>)",
        foreground: "rgb(var(--foreground) / <alpha-value>)",
        primary: {
          DEFAULT: "rgb(var(--primary) / <alpha-value>)",
          foreground: "rgb(var(--primary-foreground) / <alpha-value>)",
        },
        secondary: {
          DEFAULT: "rgb(var(--secondary) / <alpha-value>)",
          foreground: "rgb(var(--secondary-foreground) / <alpha-value>)",
        },
        destructive: {
          DEFAULT: "rgb(var(--destructive) / <alpha-value>)",
          foreground: "rgb(var(--destructive-foreground) / <alpha-value>)",
        },
        muted: {
          DEFAULT: "rgb(var(--muted) / <alpha-value>)",
          foreground: "rgb(var(--muted-foreground) / <alpha-value>)",
        },
        accent: {
          DEFAULT: "rgb(var(--accent) / <alpha-value>)",
          foreground: "rgb(var(--accent-foreground) / <alpha-value>)",
        },
        popover: {
          DEFAULT: "rgb(var(--popover) / <alpha-value>)",
          foreground: "rgb(var(--popover-foreground) / <alpha-value>)",
        },
        card: {
          DEFAULT: "rgb(var(--card) / <alpha-value>)",
          foreground: "rgb(var(--card-foreground) / <alpha-value>)",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  plugins: [daisyui, tailwindAnimate],
  daisyui: {
    themes: [
      {
        girlDark: {
          primary: "#E776F7",
          secondary: "#B887D1", // Lighter purple - was #713D87
          accent: "#1A031E",
          neutral: "#713D87",
          "base-100": "#1A031E",
          "base-content": "#FFFFFF",
          info: "#E776F7",
        },
      },
      {
        girlLight: {
          primary: "#E776F7",
          secondary: "#9D5BB5", // Medium purple - was #713D87
          accent: "#FDF2FF",
          neutral: "#000000",
          "base-100": "#FDF2FF",
          "base-content": "#000000",
          info: "#E776F7",
        },
      },
      {
        boyLight: {
          primary: "#3BE0FE",
          secondary: "#4A90E2", // Brighter blue - was #173C69
          accent: "#EBFCFF",
          neutral: "#042340",
          "base-100": "#EBFCFF",
          "base-content": "#042340",
          info: "#3BE0FE",
        },
      },
      {
        boyDark: {
          primary: "#3BE0FE",
          secondary: "#5BA3F5", // Lighter blue - was #173C69
          accent: "#051B2E",
          neutral: "#042340",
          "base-100": "#051B2E",
          "base-content": "#FFFFFF",
          info: "#3BE0FE",
        },
      },
    ],
  },
};
