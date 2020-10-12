module.exports = {
  plugins: [
    // ...(process.env.NODE_ENV === 'production'
    //   ? [
    //       [
    //         '@fullhuman/postcss-purgecss',
    //         {
    //           content: [
    //             './pages/**/*.{js,jsx,ts,tsx}',
    //             './components/**/*.{js,jsx,ts,tsx}',
    //             './node_modules/next-pattern-library/**/*.{js,jsx,ts,tsx}',
    //           ],
    //           defaultExtractor: (content) =>
    //             content.match(/[\w-/:]+(?<!:)/g) || [],
    //         },
    //       ],
    //     ]
    //   : []),
    ...[
      [
        '@fullhuman/postcss-purgecss',
        {
          content: [
            './pages/**/*.{js,jsx,ts,tsx}',
            './components/**/*.{js,jsx,ts,tsx}',
            './styles/vendor/**/*.{scss}',
          ],
          safelist: [
            /^nprogress/,
            /^snipcart/,
            /^react-toast-notifications/,
            /^react-dropzone/,
          ],
          defaultExtractor: (content) => content.match(/[\w-/:]+(?<!:)/g) || [],
        },
      ],
    ],
    'postcss-preset-env',
  ],
};
