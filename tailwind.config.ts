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
          blue: "#0B3B60",
          navy: "#002541",
          teal: "#006876",
          orange: "#E65100",
          amber: "#B45309",
          slate: "#334E68",
          muted: "#627D98",
          border: "#D1D9E2",
          surface: "#F0F4F8",
          bg: "#F8FAFC",
        },
      },
      fontFamily: {
        sans: ["Public Sans", "Inter", "system-ui", "sans-serif"],
      },
      borderRadius: {
        gov: "4px",
      },
    },
  },
  plugins: [],
};

export default config;
