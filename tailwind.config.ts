// tailwind.config.ts
import { COLOR_SET } from "./app/styles/colorSet";
import type { Config } from "tailwindcss";

const config: Config = {
    content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
    darkMode: ["class", '[data-mode="dark"]'],
    theme: {
        extend: {
            colors: COLOR_SET,
            fontFamily: {
                sans: ["var(--font-inter)", "system-ui", "sans-serif"],
            },
        },
    },
    screens: {
        'sidebar': '720px', // 720px 이상에서 사이드바 표시
    },
    plugins: [],
};

export default config;