module.exports = {
  host: process.env.NODE_HOST || 'localhost', // Define your host from 'package.json'
  port: process.env.PORT,
  app: {
    htmlAttributes: { lang: 'en' },
    title: 'Rendah',
    titleTemplate: '%s | Rendah',
    meta: [
      {
        name: 'url',
        content: 'https://www.rendahmag.com',
      },
      {
        property: 'og:url',
        content: 'https://www.rendahmag.com/',
      },
      {
        property: 'og:title',
        content: 'Rendah',
      },
      {
        property: 'og:image',
        content: 'https://res.cloudinary.com/dzz8ji5lj/image/upload/v1523314127/brand/rendah.png',
      },
    ],
  },
};
