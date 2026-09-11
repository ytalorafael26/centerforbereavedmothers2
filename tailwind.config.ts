import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        lavender: "#B7A4D8",
        sky: "#C9DFF2",
        beige: "#F5F0EA",
        ink: "#243044"
      },
      boxShadow: {
        soft: "0 20px 60px rgba(36,48,68,.10)"
      },
      borderRadius: {
        "4xl": "2rem"
      }
    }
  },
  plugins: []
};
export default config;
