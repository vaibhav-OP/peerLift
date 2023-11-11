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
      primary: "#B70808",
      secondary: "#D9D9D9",
      background: "#fff",
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
  plugins: [],
};
export default config;
