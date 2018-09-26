import MongoClient from 'mongodb';
import builder from 'xmlbuilder';

import sanity from './utils/sanity';

const mongoHandle = app => {
  app.get('/feeds/sitemap.xml', (req, res) => {
    const articles = [];
    const sitemap = [
      'https://www.rendahmag.com/',
      'https://www.rendahmag.com/watch-tower',
      'https://www.rendahmag.com/mixes',
      'https://www.rendahmag.com/authors',
      // 'https://www.rendahmag.com/store',

      'https://www.rendahmag.com/category/interviews',
      'https://www.rendahmag.com/category/insights',
      'https://www.rendahmag.com/category/news',

      'https://www.rendahmag.com/authors/dan-jones',
      'https://www.rendahmag.com/authors/dayle-hamers',
      'https://www.rendahmag.com/authors/harry-taylor',
      'https://www.rendahmag.com/authors/kieran-may',
      'https://www.rendahmag.com/authors/sam-langley',
      'https://www.rendahmag.com/authors/blair-mcgloiry',
      'https://www.rendahmag.com/authors/rosh-parmar',
      'https://www.rendahmag.com/authors/keelan-rushby',
    ];

    const params = {
      limit: '0..499',
    };

    const query = `*[_type == "post"] | order(publishedAt asc) [${params.limit}] {
      "slug": slug.current,
    }`;

    sanity.fetch(query).then(sanityRes => {
      if (sanityRes) {
        var i;
        for (i = 0; i < sanityRes.length; i++) {
          sitemap.push(`https://www.rendahmag.com/article/${sanityRes[i].slug}`);
        }

        const sitemapXML = builder
          .create('urlset')
          .att('xmlns', 'http://www.sitemaps.org/schemas/sitemap/0.9')
          .att('xmlns:news', 'http://www.google.com/schemas/sitemap-news/0.9');

        var i;
        for (i = 0; i < sitemap.length; i++) {
          const item = builder
            .create('url')
            .ele('loc')
            .txt(sitemap[i]);
          sitemapXML.importDocument(item);
        }

        // console.log(sitemapXML.toString({
        //   pretty: true
        // }));

        res.header('Content-Type', 'application/xml');
        res.send(sitemapXML.toString({ pretty: true }));
      }
    });
  });

  app.get('/feeds/articles.xml', (req, res) => {
    const params = {
      limit: '0..4',
    };

    const query = `*[_type == "post"] | order(publishedAt asc) [${params.limit}] {
      title,
      description,
      "slug": slug.current,
      "img": image.asset->url,
      "created": publishedAt,
    }`;

    sanity.fetch(query).then(sanityRes => {
      if (sanityRes) {
        const articlesFeedXML = builder.create('rss');
        articlesFeedXML.att({
          version: '2.0',
          'xmlns:atom': 'http://www.w3.org/2005/Atom',
          'xmlns:content': 'http://purl.org/rss/1.0/modules/content/',
          'xmlns:media': 'http://search.yahoo.com/mrss/',
        });

        const articlesFeedBody = builder.create('channel');

        const a = builder.create('title').txt('Rendah Weekly');
        const b = builder.create('link').txt('https://www.rendahmag.com/');
        const c = builder
          .create('atom:link')
          .att('href', 'https://www.rendahmag.com/feeds/articles.xml')
          .att('rel', 'self')
          .att('type', 'application/rss+xml');
        const d = builder.create('description').txt('Weekly updates from Rendah');

        articlesFeedBody.importDocument(a);
        articlesFeedBody.importDocument(b);
        articlesFeedBody.importDocument(c);
        articlesFeedBody.importDocument(d);

        let i;
        for (i = 0; i < sanityRes.length; i++) {
          function pubDate(date) {
            const gmtDate = new Date(date);
            return gmtDate.toUTCString();
          }

          const created = pubDate(sanityRes[i].created);
          const item = builder
            .create('item')
            .ele('title')
            .txt(sanityRes[i].title.replace('&', 'and'))
            .up()
            .ele('description')
            .txt(sanityRes[i].description.replace('&', 'and'))
            .up()
            .ele('link')
            .txt(`https://www.rendahmag.com/article/${sanityRes[i].slug}`)
            .up()
            .ele('guid')
            .txt(`https://www.rendahmag.com/article/${sanityRes[i].slug}`)
            .up()
            .ele('pubDate')
            .txt(created)
            .up()
            .ele('media:content')
            .att('url', sanityRes[i].img)
            .att('type', 'image/jpg')
            .up();
          articlesFeedBody.importDocument(item);
        }
        articlesFeedXML.importDocument(articlesFeedBody);

        // console.log(articlesFeedXML.toString({
        //   pretty: true
        // }));

        res.header('Content-Type', 'application/xml');
        res.send(
          articlesFeedXML.toString({
            pretty: true,
          }),
        );
      }
    });
  });
};

export default mongoHandle;
