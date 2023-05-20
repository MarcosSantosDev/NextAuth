/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}",],
  theme: {
    fontFamily: {
      'inter': ['var(--font-inter)', 'Helvetica', 'Arial', 'sans-serif'],
      'pressStart2P': ['var(--font-pressStart2P)', 'Helvetica', 'Arial', 'sans-serif'],
    },
    // backgroundColor: {
    //   'bg-green-gradient': 'linear-gradient(0deg, rgba(34, 193, 195, 1) 0%, rgba(45, 253, 107, 0.773546918767507) 100%)',
    // },
    extend: {
    },
  },
  plugins: [],
}

