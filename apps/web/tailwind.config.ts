import baseConfig from "@ziim/tailwind-config";
import { type Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  presets: [baseConfig],
} satisfies Config;
