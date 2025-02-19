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
        'rendah-red': '#e9393f',
        'rendah-yellow': '#fab658',
        'neutral-800': '#212121',
        // 'neutral-750': '#292929',
      },
      fontSize: {
        xxs: ['0.625rem', { lineHeight: '1rem' }], // Adjust size and line-height as desired
      },
      container: {
        center: false, // Ensures Tailwind doesn't auto-center it
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
    function ({ addComponents }) {
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
