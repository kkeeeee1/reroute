const {theme} = require('@sanity/demo/tailwind')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './intro-template/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    ...theme,
    // Overriding fontFamily to use Pretendard as primary sans-serif font
    fontFamily: {
      sans: "'Pretendard Variable', -apple-system, BlinkMacSystemFont, system-ui, 'Segoe UI', 'Helvetica Neue', Arial, sans-serif",
      serif: 'var(--font-serif)',
      mono: 'var(--font-mono)',
    },
  },
  plugins: [require('@tailwindcss/typography')],
}
