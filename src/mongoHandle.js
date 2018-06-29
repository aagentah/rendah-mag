import MongoClient from 'mongodb';

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

  // Checks if article created date is before now
  const checkDateAndReturn = (articles, limit) => {

    // Article data
    const data = [];
    let article;

    Date.prototype.addHours = function(h) {
      this.setHours(this.getHours()+h);
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

    db.collection('articles')
      .find()
      .skip(2)
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

  // GET authorArticles
  app.get('/api/authorArticles', (req, res) => {
    let articles = [];
    let param = req.query.authorQuery;
    param = param.replace(/-/g, ' ');

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

    db.collection('articles')
      .aggregate([{
        $sample: {
          size: 8,
        },
      }])
      .toArray()
      .then((result) => {
        articles = articles.concat(result);
      })
      .then(() => {
        const data = checkDateAndReturn(articles, 8);
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
      .sort('name', 1)
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
    param = param.replace(/-/g, ' ');

    db.collection('authors')
      .findOne({
        name: param,
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
