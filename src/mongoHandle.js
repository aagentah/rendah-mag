import MongoClient from 'mongodb';
import builder from 'xmlbuilder';

const mongoHandle = (app) => {
  // connect to mongo db
  let db;
  const mongoUsername = process.env.MONGO_USERNAME;
  const mongoPassword = process.env.MONGO_PASSWORD;

  if (__DEV__) {
    MongoClient.connect('mongodb://Rendah-staging:test@ds123930.mlab.com:23930/halftimefront', (err, database) => {
      if (err) return console.log(err);
      db = database;
      return console.log('staging db connected');
    });
  } else {
    MongoClient.connect(`mongodb://${mongoUsername}:${mongoPassword}@ds019996.mlab.com:19996/rendah`, (err, database) => {
      if (err) return console.log(err);
      db = database;
      return console.log('production db connected');
    });
  }

  const generateXML = () => {
    const minutes = 1;
    const interval = minutes * 60 * 1000;

    setInterval(() => {

      // var sitemap = builder.create('urlset')
      // .ele('xmlbuilder')
      //   .att('xmlns', 'http://www.sitemaps.org/schemas/sitemap/0.9')
      //   .att('xmlns:news', 'http://www.google.com/schemas/sitemap-news/0.9')
      //   .ele('url')
      //     .ele('loc')
      // .end({ pretty: true});

    }, interval);
  }

  // generateXML();

  // Checks if article created date is before now
  const checkDateAndReturn = (articles, limit) => {

    // Article data
    const data = [];
    let article;

    Date.prototype.addHours = function(h) {
      this.setHours(this.getHours() + h);
      return this;
    }

    // Dates
    const dateToday = new Date().addHours(1)
    let dateArticle;

    let i;
    for (i = 0; i < articles.length; i++) {
      dateArticle = new Date(articles[i].created);

      if (!__DEV__) {
        if (dateToday >= dateArticle) {
          article = articles[i];
          data.push(article);
        }
      } else {
        article = articles[i];
        data.push(article);
      }

      if (data.length === limit) return data;
    }

    return data;
  }

  app.get('/feeds/sitemap.xml', function(req, res) {

    let articles = [];
    var sitemap = [
      'https://www.rendahmag.com/',
      'https://www.rendahmag.com/watch-tower',
      'https://www.rendahmag.com/mixes',
      'https://www.rendahmag.com/authors',
      'https://www.rendahmag.com/store',

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
    ]

    db.collection('articles')
      .find()
      .sort('created', -1)
      .toArray()
      .then((result) => {
        articles = articles.concat(result);
      })
      .then(() => {
        const data = checkDateAndReturn(articles, 500);
        var i;
        for (i = 0; i < data.length; i++) {
          sitemap.push(`https://www.rendahmag.com/article/${data[i].url}`);
        }

        var sitemapXML = builder.create('urlset')
          .att('xmlns', 'http://www.sitemaps.org/schemas/sitemap/0.9')
          .att('xmlns:news', 'http://www.google.com/schemas/sitemap-news/0.9');

        var i;
        for (i = 0; i < sitemap.length; i++) {
          var item = builder.create('url').ele('loc').txt(sitemap[i]);
          sitemapXML.importDocument(item);
        }

        // console.log(sitemapXML.toString({
        //   pretty: true
        // }));

        res.header('Content-Type', 'application/xml');
        res.send(sitemapXML.toString({
          pretty: true
        }));
      })
      .catch((e) => {
        console.error(e);
      });
  });

  app.get('/feeds/articles.xml', function(req, res) {

    let articles = [];

    db.collection('articles')
      .find()
      .limit(5)
      .sort('created', -1)
      .toArray()
      .then((result) => {
        articles = articles.concat(result);
      })
      .then(() => {
        const data = checkDateAndReturn(articles, 5);

        var articlesFeedXML = builder.create('rss');
        articlesFeedXML.att({
          'version': "2.0",
          'xmlns:atom': "http://www.w3.org/2005/Atom",
          'xmlns:content': "http://purl.org/rss/1.0/modules/content/",
          'xmlns:media': "http://search.yahoo.com/mrss/",
        });

        var articlesFeedBody = builder.create('channel');

        var a = builder.create('title').txt('Rendah Weekly');
        var b = builder.create('link').txt('https://www.rendahmag.com/');
        var c = builder.create('atom:link')
          .att('href', 'https://www.rendahmag.com/feeds/articles.xml')
          .att('rel', 'self')
          .att('type', 'application/rss+xml');
        var d = builder.create('description').txt('Weekly updates from Rendah');

        articlesFeedBody.importDocument(a);
        articlesFeedBody.importDocument(b);
        articlesFeedBody.importDocument(c);
        articlesFeedBody.importDocument(d);

        var i;
        for (i = 0; i < data.length; i++) {

          function pubDate(date) {

            if (typeof date === 'undefined') {
              date = new Date();
            }
            var pieces = date.toString().split(' '),
              offsetTime = pieces[5].match(/[-+]\d{4}/),
              offset = (offsetTime) ? offsetTime : pieces[5],
              parts = [
                pieces[0] + ',',
                pieces[2],
                pieces[1],
                pieces[3],
                pieces[4],
                offset
              ];

            return parts.join(' ');
          }

          var created = pubDate(data[i].created);
          created = created.slice(0, -5);
          created += 'GMT';

          var item = builder.create('item')
            .ele('title').txt(data[i].title.replace("&", "and")).up()
            .ele('description').txt(data[i].description.replace("&", "and")).up()
            .ele('link').txt(`https://www.rendahmag.com/article/${data[i].url}`).up()
            .ele('guid').txt(`https://www.rendahmag.com/article/${data[i].url}`).up()
            .ele('pubDate').txt(created).up()
            .ele('media:content')
            .att('url', `https://res.cloudinary.com/dzz8ji5lj/image/upload/c_fill,g_faces:center,h_230,q_auto:eco,w_300/${data[i].img}`)
            .att('type', 'image/jpg').up()
          articlesFeedBody.importDocument(item);
        }

        articlesFeedXML.importDocument(articlesFeedBody);

        // console.log(articlesFeedXML.toString({
        //   pretty: true
        // }));

        res.header('Content-Type', 'application/xml');
        res.send(articlesFeedXML.toString({
          pretty: true
        }));
      })
      .catch((e) => {
        console.error(e);
      });
  });


  // GET week
  app.get('/api/week', (req, res) => {
    let articles = [];

    db.collection('articles')
      .find()
      .limit(12)
      .sort('created', -1)
      .toArray()
      .then((result) => {
        articles = articles.concat(result);
      })
      .then(() => {
        const data = checkDateAndReturn(articles, 2);
        res.send(data);
      })
      .catch((e) => {
        console.error(e);
      });
  });

  // GET articles
  app.get('/api/articles', (req, res) => {
    let articles = [];
    const limit = Number(req.query.limit);

    db.collection('articles')
      .find()
      .skip(2)
      .limit(limit)
      .sort('created', -1)
      .toArray()
      .then((result) => {
        articles = articles.concat(result);
      })
      .then(() => {
        const data = checkDateAndReturn(articles, limit);
        res.send(data);
      })
      .catch((e) => {
        console.error(e);
      });
  });

  // GET authorArticles
  app.get('/api/authorArticles', (req, res) => {
    let articles = [];
    let param = req.query.authorQuery;

    db.collection('articles')
      // .find()
      .find({
        author: {
          $regex: `.*${param}.*`,
        },
      })
      .limit(12)
      .sort('created', -1)
      .toArray()
      .then((result) => {
        articles = articles.concat(result);
      })
      .then(() => {
        const data = checkDateAndReturn(articles, 12);
        res.send(data);
      })
      .catch((e) => {
        console.error(e);
      });
  });

  // GET extra
  app.get('/api/extra', (req, res) => {
    let articles = [];
    const limit = Number(req.query.limit);

    db.collection('articles')
      .aggregate([{
        $sample: {
          size: limit,
        },
      }])
      .toArray()
      .then((result) => {
        articles = articles.concat(result);
      })
      .then(() => {
        const data = checkDateAndReturn(articles, limit);
        res.send(data);
      })
      .catch((e) => {
        console.error(e);
      });
  });

  // GET authors
  app.get('/api/authors', (req, res) => {
    let authors = [];

    db.collection('authors')
      .find()
      .limit(24)
      .sort('order', 1)
      .toArray()
      .then((result) => {
        // console.log(result);
        authors = authors.concat(result);
      })
      .then(() => {
        res.send(authors);
      })
      .catch((e) => {
        console.error(e);
      });
  });

  // GET search
  app.get('/api/search', (req, res) => {
    let articles = [];

    db.collection('articles')
      .find({
        $or: [{
            title: {
              $regex: `.*${req.query.searchQuery}.*`,
              $options: 'i',
            },
          },
          {
            description: {
              $regex: `.*${req.query.searchQuery}.*`,
              $options: 'i',
            },
          },
          {
            author: {
              $regex: `.*${req.query.searchQuery}.*`,
              $options: 'i',
            },
          },
        ],
      })
      .limit(24)
      .sort('created', -1)
      .toArray()
      .then((result) => {
        articles = articles.concat(result);
      })
      .then(() => {
        const data = checkDateAndReturn(articles, 24);
        res.send(data);
      })
      .catch((e) => {
        console.error(e);
      });
  });

  // GET category
  app.get('/api/category', (req, res) => {
    let articles = [];

    db.collection('articles')
      .find({
        $or: [{
          category: {
            $regex: `.*${req.query.categoryQuery}.*`,
          },
        }, ],
      })
      .limit(12)
      .sort('created', -1)
      .toArray()
      .then((result) => {
        articles = articles.concat(result);
      })
      .then(() => {
        const data = checkDateAndReturn(articles, 12);
        res.send(data);
      })
      .catch((e) => {
        console.error(e);
      });
  });

  // GET article
  app.get('/api/article', (req, res) => {
    let article = {};
    const param = req.query.title;
    // param = param.replace(/-/g, ' ');

    db.collection('articles')
      .findOne({
        url: param,
      })
      .then((result) => {
        article = result;
      })
      .then(() => {
        res.send(article);
      })
      .catch((e) => {
        console.error(e);
      });
  });

  // GET author
  app.get('/api/author', (req, res) => {
    let article = {};
    let param = req.query.title;

    db.collection('authors')
      .findOne({
        url: param,
      })
      .then((result) => {
        article = result;
      })
      .then(() => {
        res.send(article);
      })
      .catch((e) => {
        console.error(e);
      });
  });
}

export default mongoHandle;
