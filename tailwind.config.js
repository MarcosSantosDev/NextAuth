/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}",],
  theme: {
    fontFamily: {
      'inter': ['var(--font-inter)', 'Helvetica', 'Arial', 'sans-serif'],
      'pressStart2P': ['var(--font-pressStart2P)', 'Helvetica', 'Arial', 'sans-serif'],
    },
    extend: {
      gridTemplateColumns: {
        appWithSidebar: 'auto 1fr'
      }
    },
  },
  plugins: [],
}

