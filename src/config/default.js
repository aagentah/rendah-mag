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

      // Facebook
      {
        property: 'fb:app_id',
        content: '154881868603516',
      },
      {
        property: 'fb:admins',
        content: 'danjonesaagentah',
      },
      {
        property: 'og:type',
        content: 'article',
      },
      {
        property: 'og:description',
        content: 'Beats, Halftime & Future Bass Magazine focused on the latest news & releases.',
      },
      {
        property: 'og:site_name',
        content: 'Rendah Mag',
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

      // Twitter
      {
        name: 'twitter:card',
        content: 'summary',
      },
      {
        name: 'twitter:site',
        content: '@RendahMag',
      },
      {
        name: 'twitter:creator',
        content: '@RendahMag',
      },
      {
        name: 'twitter:description',
        content: 'Beats, Halftime & Future Bass Magazine focused on the latest news & releases.',
      },
    ],
  },
};
