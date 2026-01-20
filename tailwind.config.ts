// tailwind.config.ts
import { COLOR_SET } from "@/app/styles/colorSet";

module.exports = {
    content: ["./src/**/*.{ts,tsx}"],
    darkMode: ["class", '[data-mode="dark"]'],
    theme: {
        extend: {
            colors: COLOR_SET,
        },
    },
    plugins: [],
};