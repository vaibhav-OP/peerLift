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
        text: "#0C040B",
        accent: "#70BB3A",
        primary: "#E49F7A",
        secondary: "#0A1F16",
        background: "#fff",
      },
    },
  },
  plugins: [],
};
export default config;
