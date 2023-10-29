import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      height: {
        screen: ["100vh", "100dvh"],
      },
      borderRadius: {
        max: "48px",
      },
      colors: {
        text: "#0C040B",
        accent: "#70BB3A",
        primary: "#E49F7A",
        secondary: "#6B77D4",
        background: "#fff",
      },
    },
  },
  plugins: [],
};
export default config;
