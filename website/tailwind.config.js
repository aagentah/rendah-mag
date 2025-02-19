/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,jsx,ts,tsx}',
    './components/**/*.{js,jsx,ts,tsx}',
    './context-provider/**/*.{js,jsx,ts,tsx}',
    './lib/**/*.{js,jsx,ts,tsx}',
    './functions/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        neutral: {
          50: 'var(--neutral-50)',
          100: 'var(--neutral-100)',
          200: 'var(--neutral-200)',
          300: 'var(--neutral-300)',
          400: 'var(--neutral-400)',
          500: 'var(--neutral-500)',
          600: 'var(--neutral-600)',
          700: 'var(--neutral-700)',
          800: 'var(--neutral-800)',
          900: 'var(--neutral-900)',
        },
        'rendah-red': '#e9393f',
        'rendah-yellow': '#fab658',
      },
      fontSize: {
        xxs: ['0.625rem', { lineHeight: '1rem' }],
      },
      container: {
        center: false,
        screens: {
          sm: '100%',
          md: '100%',
          lg: '100%',
          xl: '100%',
          '2xl': '100%',
        },
      },
    },
  },
  plugins: [
    function ({ addBase, addComponents }) {
      addComponents({
        '.container': {
          width: '100%',
          paddingLeft: '3rem',
          paddingRight: '3rem',
          marginLeft: 'auto',
          marginRight: 'auto',
        },
      });
    },
  ],
};
