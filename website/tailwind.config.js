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
    },
  },
  plugins: [
    function ({ addComponents }) {
      addComponents({
        '.container': {
          width: '100%',
          paddingLeft: '15px',
          paddingRight: '15px',
          marginLeft: 'auto',
          marginRight: 'auto',
        },
      });
    },
  ],
};
