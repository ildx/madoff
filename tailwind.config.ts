import type { Config } from "tailwindcss";

const config = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [],
  // This ensures consistent class sorting
  future: {
    hoverOnlyWhenSupported: true,
  },
} satisfies Config;

export default config;
