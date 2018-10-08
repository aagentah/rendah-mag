module.exports = {
  host: process.env.NODE_HOST || 'localhost', // Define your host from 'package.json'
  port: process.env.PORT,
  app: {
    htmlAttributes: { lang: 'en' },
    title: 'Rendah',
    titleTemplate: '%s | Rendah',
    meta: [
      /*
        Default
      */
      {
        name: 'url',
        content: 'https://www.rendahmag.com',
      },
      {
        name: 'description',
        content: 'Beats, Halftime & Future Bass Magazine focused on the latest news & releases.',
      },
      {
        name: 'owner',
        content: 'Dan Jones (Aagentah)',
      },
      {
        name: 'coverage',
        content: 'Global',
      },
      {
        name: 'google-site-verification',
        content: 'McC244vXNDQ0OSscIQWMXtOcq2cSEZ3Nm2ePymrTYRs',
      },
      /*
        Browser / OS
      */
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
        name: 'mobile-web-app-capable',
        content: 'yes',
      },
      {
        name: 'theme-color',
        content: '#ffffff',
      },
      {
        name: 'msapplication-TileColor',
        content: '#da532c',
      },
      /*
        Facebook
      */
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
        content: 'https://res.cloudinary.com/dzz8ji5lj/image/upload/v1539032515/brand/rendah-facebook-meta-logo.jpg',
      },
      {
        property: 'og:image:width',
        content: '1080',
      },
      {
        property: 'og:image:height',
        content: '1080',
      },
      /*
        Twitter
      */
      {
        name: 'twitter:title',
        content: 'Rendah Mag',
      },
      {
        name: 'twitter:image',
        content: 'https://res.cloudinary.com/dzz8ji5lj/image/upload/v1539032515/brand/rendah-facebook-meta-logo.jpg',
      },
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
