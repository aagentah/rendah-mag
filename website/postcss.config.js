module.exports = {
  plugins: [
    // 1. Tailwind CSS
    'tailwindcss',

    // 2. Autoprefixer
    'autoprefixer',

    // 3. Existing plugins
    'postcss-flexbugs-fixes',
    [
      'postcss-preset-env',
      {
        autoprefixer: {
          flexbox: 'no-2009',
        },
        stage: 3,
        features: {
          'custom-properties': false,
        },
      },
    ],
    // If you bring back purgecss or other plugins, ensure they come after Tailwind
    // so they can correctly parse and remove only unused Tailwind classes.
  ],
};
