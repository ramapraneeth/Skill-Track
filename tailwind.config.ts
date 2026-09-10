import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        gov: {
          navy: "#0B2D4F",
          deep: "#12345B",
          blue: "#1769E0",
          action: "#1E6FF2",
          light: "#EAF4FF",
          lightBlue: "#EAF4FF",
          border: "#E4EDF7",
          bg: "#F5F9FD",
          surface: "#FFFFFF",
          muted: "#4B6380",
          orange: "#F59E0B",
          green: "#16A34A",
          slate: "#334E68",
        },
      },
      fontFamily: {
        sans: ["Inter", "Manrope", "system-ui", "-apple-system", "sans-serif"],
      },
      borderRadius: {
        gov: "8px",
      },
    },
  },
  plugins: [],
};

export default config;
