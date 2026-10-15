import type { Config } from "tailwindcss";

const config: Config = { content: ["./app/**/*.{js,ts,jsx,tsx,mdx}", "./components/**/*.{js,ts,jsx,tsx,mdx}"], theme: { extend: { colors: { navy: "#0A2540", gold: "#FFD700" } } }, plugins: [] };
export default config;