import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/hooks/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    colors: {
      text: "#000",
      grey: "#292929",
      green: "#11A04B",
      primary: "#B70808",
      background: "#fff",
      secondary: "#D7D5FC",
      transparent: "transparent",
    },
    extend: {
      height: {
        // @ts-ignore
        screen: ["100vh", "100dvh"],
      },
      borderRadius: {
        max: "48px",
      },
    },
  },
  plugins: [require("tailwind-scrollbar")],
};
export default config;
