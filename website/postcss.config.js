module.exports = {
  plugins: [
    'postcss-flexbugs-fixes',
    [
      'postcss-preset-env',
      {
        autoprefixer: {
          flexbox: 'no-2009'
        },
        stage: 3,
        features: {
          'custom-properties': false
        }
      }
    ],
    [
      '@fullhuman/postcss-purgecss',
      {
        content: [
          './pages/**/*.{js,jsx,ts,tsx}',
          './components/**/*.{js,jsx,ts,tsx}'
        ],
        defaultExtractor: content => content.match(/[\w-/:]+(?<!:)/g) || [],
        safelist: {
          standard: [
            /black$/,
            /almost-black$/,
            /dark-grey$/,
            /mid-grey$/,
            /grey$/,
            /silver$/,
            /light-silver$/,
            /moon-grey$/,
            /light-grey$/,
            /almost-white$/,
            /white$/,
            /blue$/,
            /red$/,
            /green$/,
            /primary-color$/,
            /secondary-color$/,
            /info-color$/,
            /creations-black$/,
            /rendah-red$/,
            /rendah-yellow$/
          ]
          // deep: [/blue$/],
          // greedy: [/yellow$/]
        }
      }
    ]
  ]
};
