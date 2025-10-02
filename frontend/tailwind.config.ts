import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        sovereign: {
          red: "#FF0000",
          black: "#000000",
          white: "#FFFFFF",
        },
      },
    },
  },
  plugins: [],
};
export default config;
