/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#F8FAFC',
        sidebar: '#064E3B',
        card: '#FFFFFF',
        primary: {
          DEFAULT: '#059669',
          hover: '#047857',
          light: '#ECFDF5',
        },
        accent: {
          DEFAULT: '#10B981',
          light: '#D1FAE5',
        },
        darkText: '#172B24',
        slateBorder: '#E2E8F0',
      },
      fontFamily: {
        sans: ['DM Sans', 'Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

