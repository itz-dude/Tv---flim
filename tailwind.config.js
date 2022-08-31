const plugin = require('tailwindcss/plugin');

module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        main: '#ff0000',
        body: '#0f0f0f',
      },
      spacing: {
        headerHeight: '8rem',
        headerShrinkHeight: '5rem',
      },
      screens: {
        'hover-hover': { raw: '(hover: hover)' },
      },
    },
  },
  plugins: [
    plugin(function ({ addVariant }) {
      addVariant('&>*~*', '&>*', 'not-last', '&:not(:last-child)');
    }),
  ],
};
