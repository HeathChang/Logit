
const config = {
    content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
    darkMode: ["class", '[data-mode="dark"]'],
    theme: {
        extend: {
            fontFamily: {
                sans: ["var(--font-inter)", "system-ui", "sans-serif"],
            },
        },
    },
    plugins: [],
};

export default config;