import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    colors: {
      text: "#000",
      primary: "#B70808",
      secondary: "#6B77D4",
      background: "#fff",
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
