/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["'Plus Jakarta Sans'", "system-ui", "-apple-system", "sans-serif"],
        mono: ["'JetBrains Mono'", "monospace"],
        kanit: ["'Kanit'", "sans-serif"],
      },
      colors: {
        ivory: {
          light: '#FAF8F5',
          DEFAULT: '#F4F0E8',
          dark: '#EBE5D9',
        },
        stone: {
          light: '#F0EBE2',
          DEFAULT: '#ECE6DC',
          dark: '#DDD5C8',
        },
        parchment: {
          DEFAULT: '#E4DDD2',
          dark: '#D5CCBF',
        },
        charcoal: {
          light: '#242321',
          DEFAULT: '#141413',
          dark: '#0C0C0B',
        },
        slate: {
          light: '#827E77',
          DEFAULT: '#524F4A',
          dark: '#302E2B',
        },
        terracotta: {
          light: '#F8EAE6',
          DEFAULT: '#BD5338',
          dark: '#933E27',
        },
        sage: {
          light: '#E1EBE3',
          DEFAULT: '#3F6E50',
          dark: '#2E523A',
        },
        dusty: {
          light: '#DCE7EE',
          DEFAULT: '#3A6D8C',
          dark: '#274D64',
        },
        mustard: {
          light: '#F8EFE0',
          DEFAULT: '#C48229',
          dark: '#96611B',
        },
        lavender: {
          light: '#ECE7F2',
          DEFAULT: '#6B587B',
          dark: '#4F3F5C',
        },
      },
    },
  },
  plugins: [],
}
