module.exports = {
  host: process.env.NODE_HOST || 'localhost', // Define your host from 'package.json'
  port: process.env.PORT,
  app: {
    htmlAttributes: { lang: 'en' },
    title: 'Rendah',
    titleTemplate: '%s - Rendah',
    meta: [
      {
        name: 'keywords',
        content: 'Beats, Halftime, Footwork, Trap, Future Bass, Drum & Bass, Dance Music, DnB, Magazine, Blog, News, Review, Mixes, Aagentah',
      },
      {
        name: 'description',
        content: 'Beats, Halftime & Future Bass Magazine',
      },
      {
        name: 'owner',
        content: 'Dan Jones (Aagentah)',
      },
      {
        name: 'coverage',
        content: 'Worldwide',
      },
      {
        name: 'coverage',
        content: 'Global',
      },
      {
        name: 'url',
        content: 'http://www.rendahmag.com',
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
      {
        name: 'twitter:card',
        content: 'summary',
      },
      {
        name: 'twitter:site',
        content: '@rendahmag',
      },
      {
        name: 'twitter:creator',
        content: '@rendahmag',
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
        property: 'og:description',
        content: 'Beats, Halftime & Future Bass Magazine',
      },
      {
        property: 'og:image',
        content: 'http://res.cloudinary.com/dzz8ji5lj/image/upload/v1523314127/brand/rendah.png',
      },
      {
        property: 'og:type',
        content: 'website',
      },
      {
        property: 'og:site_name',
        content: 'Rendah Mag',
      },
      {
        property: 'fb:admins',
        content: 'danjonesaagentah',
      },
      {
        property: 'fb:app_id',
        content: '154881868603516',
      },
    ],
  },
};
