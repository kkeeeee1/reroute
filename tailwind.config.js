const {theme} = require('@sanity/demo/tailwind')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    ...theme,
    fontFamily: {
      sans: "'Pretendard Variable', -apple-system, BlinkMacSystemFont, system-ui, 'Segoe UI', 'Helvetica Neue', Arial, sans-serif",
      serif: 'var(--font-serif)',
      mono: 'var(--font-mono)',
    },
    extend: {
      colors: {
        navy: '#0E1C62',
      },
      maxWidth: {
        'screen-max': '1920px',
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
}
