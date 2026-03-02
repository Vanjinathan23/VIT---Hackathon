/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    darkMode: "class",
    theme: {
        extend: {
            colors: {
                "primary": "#1e3b8a",
                "primary-light": "#2a52c9",
                "background-light": "#f8fafc",
                "background-dark": "#121620",
                "neutral-subtle": "#6b7280",
            },
            fontFamily: {
                display: ["Inter", "system-ui", "sans-serif"],
            },
        },
    },
    plugins: [],
}
