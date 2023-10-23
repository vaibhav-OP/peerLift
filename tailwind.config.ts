import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      borderRadius: {
        max: "48px",
      },
      colors: {
        text: "#FEFBFE",
        accent: "#70BB3A",
        primary: "#7AD682",
        secondary: "#0A1F16",
        background: "#0C040B",
      },
    },
  },
  plugins: [],
};
export default config;
