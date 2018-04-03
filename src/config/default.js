module.exports = {
  host: process.env.NODE_HOST || 'localhost', // Define your host from 'package.json'
  port: process.env.PORT,
  app: {
    htmlAttributes: { lang: 'en' },
    title: 'Rendah',
    titleTemplate: 'Rendah - %s',
    meta: [
      {
        name: 'description',
        content: 'Beats culture magazine',
      },
      {
        name: 'apple-mobile-web-app-title',
        content: 'Rendah',
      },
      {
        name: 'apple-mobile-web-app-capable',
        content: 'yes',
      },
      {
        name: 'apple-mobile-web-app-status-bar-style',
        content: 'black',
      },
      {
        name: 'theme-color',
        content: '#ffffff',
      },
      {
        name: 'mobile-web-app-capable',
        content: 'yes',
      },
      {
        name: 'theme-color',
        content: '#fff',
      },
    ],
  },
};
