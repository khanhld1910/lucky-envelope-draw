import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        'envelope-red': '#ea384c',
        'envelope-gold': '#ffd700',
      },
      keyframes: {
        'envelope-open': {
          '0%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.1)' },
          '100%': { transform: 'scale(1)' },
        }
      },
      animation: {
        'envelope-open': 'envelope-open 0.3s ease-in-out',
      },
      backgroundImage: {
        'lucky-pattern': "url(\"data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M50 50l-25-25L50 0l25 25L50 50zm0 0l25 25L50 100l-25-25L50 50z' fill='%23ffd700' fill-opacity='0.05'/%3E%3C/svg%3E\")",
      }
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
